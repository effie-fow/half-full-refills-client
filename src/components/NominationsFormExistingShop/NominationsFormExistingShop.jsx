import "./NominationsFormExistingShop.scss";
import Dropdown from "react-dropdown";
import { useEffect, useState } from "react";
import { ItemCheckbox } from "../ItemCheckbox/ItemCheckbox";
import { Button } from "../Button/Button";
import { countNominations } from "../../utils/countNominations";
import {
  getNominatedShops,
  getAllItems,
  postNominationItems,
  getSingleShop,
} from "../../utils/apiUtils";
// CUSTOMISE REACT DROPDOWN LATER AND REMOVE THIS -------
import "react-dropdown/style.css";
// ------------------------------------------------------

export const NominationsFormExistingShop = () => {
  const [nominatedShops, setNominatedShops] = useState(null);
  const [dropDownShops, setDropDownShops] = useState(null);
  const [items, setItems] = useState(null);
  const [currentShop, setCurrentShop] = useState(null);
  const [shopActivated, setShopActivated] = useState("");
  const [emptyFieldMessage, setEmptyFieldMessage] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState("");

  const fetchNominatedShops = async () => {
    const shopsForDropdown = [];
    const shopsNameId = [];

    try {
      const nominatedShopsData = await getNominatedShops();
      nominatedShopsData.forEach((shop) => {
        if (shopsForDropdown.includes(shop.name)) {
          return;
        }

        shopsForDropdown.push(shop.name);

        shopsNameId.push({
          name: shop.name,
          id: shop.id,
        });
      });
    } catch (error) {
      console.error(error);
    }
    setDropDownShops(shopsForDropdown);
    setNominatedShops(shopsNameId);
  };

  const fetchItems = async () => {
    try {
      const itemsData = await getAllItems();
      setItems(itemsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedItems = [];

    for (let i = 0; i < items.length; i++) {
      if (event.target[i].checked) {
        selectedItems.push(event.target[i].name);
      }
    }

    const nominationData = {
      users_id: 8,
      items: selectedItems,
    };

    let shopId;

    nominatedShops.forEach((shop) => {
      if (shop.name === currentShop) {
        shopId = shop.id;
      }
    });

    if (!shopId) {
      setEmptyFieldMessage("Please select a shop to nominate.");
      return;
    }

    if (!nominationData.items.length) {
      setEmptyFieldMessage(
        "Please tell us which items you're nominated shop stocks."
      );
      return;
    }

    try {
      await postNominationItems(shopId, nominationData);
      event.target.reset();

      const nominatedShop = await countNominations(shopId, currentShop);
      if (typeof nominatedShop === "string") {
        setThankYouMessage(nominatedShop);
        setTimeout(() => setThankYouMessage(""), 3000);
      }

      const shopDetails = await getSingleShop(shopId);

      if (shopDetails.is_active) {
        setShopActivated(`Yours was the 100th nomination! ${nominatedShop.name} is now active on
        our website with details on ${nominatedShop.items.length} of its refillables and key details, thanks to you!`);
        setTimeout(() => {
          setShopActivated("");
        }, 6000);
      }

      setEmptyFieldMessage("");
      setCurrentShop(null);
      fetchNominatedShops();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNominatedShops();
    fetchItems();
  }, []);

  if (!dropDownShops || !nominatedShops || !items) {
    return <div>Loading...</div>;
  }

  return (
    <form noValidate className="existing-shops-form" onSubmit={handleSubmit}>
      <Dropdown
        options={dropDownShops}
        className="existing-shops-form__dropdown"
        placeholder="Select a Shop"
        value={currentShop ? currentShop : ""}
        onChange={(event) => {
          setCurrentShop(event.value);
        }}
      />
      {items.map((item) => {
        return <ItemCheckbox key={item.id} item={item} />;
      })}
      <Button buttonText="Nominate" />
      {shopActivated ? <p>{shopActivated}</p> : <></>}
      {thankYouMessage ? <p>{thankYouMessage}</p> : <></>}
      {emptyFieldMessage ? <p>{emptyFieldMessage}</p> : <></>}
    </form>
  );
};
