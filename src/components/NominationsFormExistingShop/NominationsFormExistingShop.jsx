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
  getNominationsForShop,
} from "../../utils/apiUtils";
import { Loader } from "../Loader/Loader";

export const NominationsFormExistingShop = ({ user }) => {
  const [nominatedShops, setNominatedShops] = useState(null);
  const [dropDownShops, setDropDownShops] = useState(null);
  const [items, setItems] = useState(null);
  const [currentShop, setCurrentShop] = useState(null);
  const [emptyFieldMessage, setEmptyFieldMessage] = useState("");
  const [serverDown, setServerDown] = useState(false);
  const [activated, setActivated] = useState(false);
  const [nominated, setNominated] = useState(false);

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
      setServerDown(true);
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
      setServerDown(true);
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
      users_id: user.id,
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
      const currentShopsNominations = await getNominationsForShop(shopId);

      if (currentShopsNominations && currentShopsNominations.length) {
        for (let nomination of currentShopsNominations) {
          if (nomination.users_id === user.id) {
            setEmptyFieldMessage(
              `Sorry ${user.name}, only one nomination per shop... no matter how good ${currentShop} may be!`
            );
            setTimeout(() => setEmptyFieldMessage(""), 8000);
            return;
          }
        }
      }

      await postNominationItems(shopId, nominationData);
      event.target.reset();

      await countNominations(shopId, currentShop);

      const shopDetails = await getSingleShop(shopId);

      if (shopDetails.is_active) {
        setEmptyFieldMessage("");
        setCurrentShop(null);
        setActivated(true);
        return;
      }

      setNominated(true);
      setEmptyFieldMessage("");
      setCurrentShop(null);
      fetchNominatedShops();
    } catch (error) {
      setServerDown(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNominatedShops();
    fetchItems();
  }, []);

  if (!dropDownShops || !nominatedShops || !items) {
    return <Loader />;
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
          <Button buttonText="Nominate" />
        </div>
      </form>
      <div className="existing-shops-form__message-container">
        <span className="existing-shops-form__form-popup">
          {emptyFieldMessage ? `${emptyFieldMessage}` : ""}
        </span>
        {nominated ? <Navigate to="/nomination-confirm" /> : <></>}
        {activated ? <Navigate to="/shop-activated" /> : <></>}
      </div>
    </>
  );
};
