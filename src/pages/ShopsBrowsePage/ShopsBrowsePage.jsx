import "./ShopsBrowsePage.scss";
import { MapBox } from "../../components/MapBox/MapBox";
import { useEffect, useState } from "react";
import { getActiveShops } from "../../utils/apiUtils";
import { FilterShopsForm } from "../../components/FilterShopsForm/FilterShopsForm";
import { ShopsIntro } from "../../components/ShopsIntro/ShopsIntro";

export const ShopsBrowsePage = () => {
  const [shops, setShops] = useState(null);
  const [serverDown, setServerDown] = useState(false);
  const [shopSearchMessage, setShopSearchMessage] = useState("");
  const [browsingType, setBrowsingType] = useState(
    "I'm looking for something specific"
  );

  const fetchShops = async () => {
    try {
      const activeShops = await getActiveShops();
      setShops(activeShops);
    } catch (error) {
      console.error(error);
      setServerDown(true);
    }
  };

  const handleBrowsingType = () => {
    browsingType === "I'm looking for something specific"
      ? setBrowsingType("I'm just browsing")
      : setBrowsingType("I'm looking for something specific");

    fetchShops();
  };

  useEffect(() => {
    fetchShops();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!shops) {
    return <div>Loading...</div>;
  }

  if (serverDown) {
    return <Navigate to="/500" />;
  }

  return (
    <main className="shops">
      <ShopsIntro />
      <span className="shops__button" onClick={handleBrowsingType}>
        {browsingType}
      </span>
      {browsingType === "I'm just browsing" ? (
        <FilterShopsForm
          setShops={setShops}
          setShopSearchMessage={setShopSearchMessage}
        />
      ) : (
        <></>
      )}
      <div className="shops__search-message-container">
        {shopSearchMessage ? (
          <p className="shops__search-message">{shopSearchMessage}</p>
        ) : (
          <></>
        )}
      </div>
      {shops ? <MapBox shops={shops} /> : <></>}
      <div className="shops__refresh-shops-container">
        <span className="shops__button" onClick={fetchShops}>
          Refresh Shops
        </span>
      </div>
    </main>
  );
};
