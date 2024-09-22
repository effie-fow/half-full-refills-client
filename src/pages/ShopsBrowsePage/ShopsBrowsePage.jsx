import "./ShopsBrowsePage.scss";
import { MapBox } from "../../components/MapBox/MapBox";
import { useEffect, useState } from "react";
import { getActiveShops } from "../../utils/apiUtils";

export const ShopsBrowsePage = () => {
  const [shops, setShops] = useState(null);

  const fetchShops = async () => {
    try {
      const nominatedShopsData = await getActiveShops();
      setShops(nominatedShopsData);
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
    <div>
      <p>Shops</p>
      <MapBox shops={shops} />
    </div>
  );
};
