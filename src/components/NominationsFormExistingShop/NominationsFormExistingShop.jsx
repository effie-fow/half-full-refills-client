import "./NominationsFormExistingShop.scss";
import "react-dropdown/style.css";
import Dropdown from "react-dropdown";
import { useEffect, useState } from "react";
import { ItemCheckbox } from "../ItemCheckbox/ItemCheckbox";
import { Button } from "../Button/Button";
import { countNominations } from "../../utils/countNominations";
import { Navigate } from "react-router-dom";
import { CheckboxInstructions } from "../CheckboxInstructions/CheckboxInstructions";
import {
  getNominatedShops,
  getAllItems,
  postNominationItems,
  getSingleShop,
} from "../../utils/apiUtils";

export const NominationsFormExistingShop = () => {
  const [nominatedShops, setNominatedShops] = useState(null);
  const [dropDownShops, setDropDownShops] = useState(null);
  const [items, setItems] = useState(null);
  const [currentShop, setCurrentShop] = useState(null);
  const [shopActivated, setShopActivated] = useState("");
  const [emptyFieldMessage, setEmptyFieldMessage] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState("");
  const [serverDown, setServerDown] = useState(false);

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
      setServerDown(true);
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
      setServerDown(true);
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
      setTimeout(() => setEmptyFieldMessage(""), 3000);
      return;
    }

    if (!nominationData.items.length) {
      setEmptyFieldMessage("Don't forget to add items!");
      setTimeout(() => setEmptyFieldMessage(""), 3000);
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
      setServerDown(true);
    }
  };

  useEffect(() => {
    fetchNominatedShops();
    fetchItems();
  }, []);

  if (!dropDownShops || !nominatedShops || !items) {
    return <div>Loading...</div>;
  }

  if (serverDown) {
    return <Navigate to="/500" />;
  }

  return (
    <>
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
        <fieldset className="existing-shops-form__items">
          <CheckboxInstructions />
          <div className="existing-shops-form__checkboxes-container">
            {items.map((item) => {
              return <ItemCheckbox key={item.id} item={item} />;
            })}
          </div>
        </fieldset>
        <div className="existing-shops-form__button-container">
          <span className="existing-shops-form__form-popup">
            {shopActivated ? `${shopActivated}` : " "}
            {thankYouMessage ? `${thankYouMessage}` : ""}
            {emptyFieldMessage ? `${emptyFieldMessage}` : ""}
          </span>
          <Button buttonText="Nominate" />
        </div>
        {thankYouMessage ? <Navigate to="/shops" /> : <></>}
      </form>
    </>
  );
};
