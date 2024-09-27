import "./ShopsBrowsePage.scss";
import { MapBox } from "../../components/MapBox/MapBox";
import { useEffect, useRef, useState } from "react";
import { getActiveShops } from "../../utils/apiUtils";
import { FilterShopsForm } from "../../components/FilterShopsForm/FilterShopsForm";
import { ShopsIntro } from "../../components/ShopsIntro/ShopsIntro";
import { Navigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export const ShopsBrowsePage = () => {
  const searchScrollRef = useRef();
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
      setServerDown(true);
      console.error(error);
      console.log(serverDown);
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

  if (serverDown) {
    return <Navigate to="/500" />;
  }

  if (!shops) {
    return <Loader />;
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
          searchScrollRef={searchScrollRef}
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
      <div className="shops__mapbox-container" ref={searchScrollRef}>
        {shops ? <MapBox shops={shops} /> : <></>}
      </div>
      <div className="shops__refresh-shops-container">
        <span className="shops__button" onClick={fetchShops}>
          Refresh Shops
        </span>
      </div>
    </main>
  );
};
