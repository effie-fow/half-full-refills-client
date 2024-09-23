import "./ShopsBrowsePage.scss";
import { MapBox } from "../../components/MapBox/MapBox";
import { useEffect, useState } from "react";
import { getActiveShops } from "../../utils/apiUtils";
import { FilterShopsForm } from "../../components/FilterShopsForm/FilterShopsForm";

export const ShopsBrowsePage = () => {
  const [shops, setShops] = useState(null);
  const [shopSearchMessage, setShopSearchMessage] = useState("");

  const fetchShops = async () => {
    try {
      const activeShops = await getActiveShops();
      setShops(activeShops);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  if (!shops) {
    return <div>Loading...</div>;
  }

  return (
    <main className="shops">
      <p>Shops</p>
      <FilterShopsForm
        setShops={setShops}
        setShopSearchMessage={setShopSearchMessage}
      />
      <p onClick={fetchShops}>Refresh shops</p>
      {shopSearchMessage ? <p>{shopSearchMessage}</p> : <></>}
      <MapBox shops={shops} />
    </main>
  );
};
