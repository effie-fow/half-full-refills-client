import "./NominationsFormNewShop.scss";
import { useEffect, useState } from "react";
import { ItemCheckbox } from "../ItemCheckbox/ItemCheckbox";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import {
  generateEmptyInputMessage,
  inputContainsNumbers,
} from "../../utils/formValidators";
import {
  getNominatedShops,
  getAllItems,
  postNominationItems,
  postNewShop,
  checkShopExists,
} from "../../utils/apiUtils";
import { getCoordinates } from "../../utils/mapBoxApi";
import { CheckboxInstructions } from "../CheckboxInstructions/CheckboxInstructions";
import { FormFieldsInstructions } from "../FormFieldsInstructions/FormFieldsInstructions";
import { Divider } from "../Divider/Divider";
import { Navigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";

export const NominationsFormNewShop = ({ user }) => {
  const [nominatedShops, setNominatedShops] = useState(null);
  const [items, setItems] = useState(null);
  const [emptyInputMessage, setEmptyInputMessage] = useState(null);
  const [missingInput, setMissingInput] = useState(false);
  const [serverDown, setServerDown] = useState(false);
  const [newShopAdded, setNewShopAdded] = useState(false);

  const fetchNominatedShops = async () => {
    try {
      const nominatedShopsData = await getNominatedShops();
      setNominatedShops(nominatedShopsData);
    } catch (error) {
      setServerDown(true);
      console.error(error);
    }
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
    setMissingInput(false);

    const { name, street_number, street_name, city, postcode } = event.target;

    const inputsList = [name, street_number, street_name, city, postcode];

    for (let input of inputsList) {
      if (!input.value) {
        setEmptyInputMessage(generateEmptyInputMessage(input));
        setMissingInput(true);
        setTimeout(() => setMissingInput(false), 3000);
        return;
      }
    }

    if (
      inputContainsNumbers(street_name.value) ||
      inputContainsNumbers(city.value)
    ) {
      setEmptyInputMessage(
        "Only the name, street number and postcode fields can contain numbers."
      );
      setMissingInput(true);
      setTimeout(() => setMissingInput(false), 3000);
      return;
    }

    const newShop = {
      name: name.value,
      street_number: street_number.value,
      street_name: street_name.value,
      city: city.value,
      postcode: postcode.value,
      is_active: false,
    };

    try {
      const { street_number, street_name, city } = newShop;
      const shopAlreadyExists = await checkShopExists(
        street_number,
        street_name,
        city
      );

      if (shopAlreadyExists) {
        setMissingInput(true);
        setEmptyInputMessage(
          `Someone has already registered a shop at ${street_number} ${street_name} in ${city}. Have a look on our Refill page or click 'Nominate Existing Shop' above to check it out!`
        );
        return;
      }

      const coordinates = await getCoordinates(
        street_number,
        street_name,
        city
      );

      newShop.coordinates = JSON.stringify(coordinates);

      const newShopResponse = await postNewShop(newShop);
      const newShopId = newShopResponse.data.id;
      const selectedItems = [];

      for (let i = 6; i < items.length + 6; i++) {
        if (event.target[i].checked) {
          selectedItems.push(event.target[i].name);
        }
      }

      if (!selectedItems.length) {
        setEmptyInputMessage("Don't forget to add items!");
        setMissingInput(true);
        return;
      }

      const nominationData = {
        users_id: user.id,
        items: selectedItems,
      };

      await postNominationItems(newShopId, nominationData);
      setNewShopAdded(true);
      event.target.reset();
      await fetchNominatedShops();
    } catch (error) {
      setServerDown(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNominatedShops();
    fetchItems();
  }, []);

  if (!nominatedShops || !items) {
    return <Loader />;
  }

  if (serverDown) {
    return <Navigate to="/500" />;
  }

  return (
    <form noValidate className="new-shops-form" onSubmit={handleSubmit}>
      <fieldset className="new-shops-form__shop-details">
        <FormFieldsInstructions />
        <TextInput
          userLabel={"Shop Name"}
          devLabel={"name"}
          placeholder={"Add the shop's name"}
        />
        <div className="new-shops-form__street-number-container">
          <label
            htmlFor="street_number"
            className="new-shops-form__street-number-label"
          >
            Street Number:{" "}
          </label>
          <input
            type="number"
            name="street_number"
            id="street_number"
            className="new-shops-form__street-number-input"
            placeholder="Add the street number"
          />
        </div>
        <TextInput
          userLabel={"Street Name"}
          devLabel={"street_name"}
          placeholder={"Add the street name"}
        />
        <TextInput
          userLabel={"City"}
          devLabel={"city"}
          placeholder={"Add the shop's city"}
        />
        <TextInput
          userLabel={"Postcode"}
          devLabel={"postcode"}
          placeholder={"Add the shop's postcode"}
        />
      </fieldset>
      <Divider />
      <fieldset className="new-shops-form__items">
        <CheckboxInstructions />
        <div className="new-shops-form__checkboxes-container">
          {items.map((item) => {
            return <ItemCheckbox key={item.id} item={item} />;
          })}
        </div>
      </fieldset>
      <div className="new-shops-form__button-container">
        <Button buttonText="Nominate" />
      </div>
      <div className="new-shops-form__message-container">
        <span className="new-shops-form__form-popup">
          {missingInput ? `${emptyInputMessage}` : ""}
        </span>
      </div>
      {newShopAdded ? <Navigate to="/add-shop-success" /> : <></>}
    </form>
  );
};
