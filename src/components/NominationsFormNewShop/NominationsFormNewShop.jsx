import "./NominationsFormNewShop.scss";
import { useEffect, useState } from "react";
import { ItemCheckbox } from "../ItemCheckbox/ItemCheckbox";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import { generateEmptyInputMessage } from "../../utils/formValidators";
import {
  getNominatedShops,
  getAllItems,
  postNominationItems,
  postNewShop,
} from "../../utils/apiUtils";
import { getCoordinates } from "../../utils/mapBoxApi";

export const NominationsFormNewShop = () => {
  const [nominatedShops, setNominatedShops] = useState(null);
  const [items, setItems] = useState(null);
  const [emptyInputMessage, setEmptyInputMessage] = useState(null);
  const [missingInput, setMissingInput] = useState(false);

  const fetchNominatedShops = async () => {
    try {
      const nominatedShopsData = await getNominatedShops();
      setNominatedShops(nominatedShopsData);
    } catch (error) {
      console.error(error);
    }
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
    setMissingInput(false);

    const { name, street_number, street_name, city, postcode } = event.target;

    const inputsList = [name, street_number, street_name, city, postcode];

    for (let input of inputsList) {
      if (!input.value) {
        setEmptyInputMessage(generateEmptyInputMessage(input));
        setMissingInput(true);
        return;
      }
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
        setEmptyInputMessage("Don't forget to let us know the shop sells!");
        setMissingInput(true);
        return;
      }

      const nominationData = {
        users_id: 7,
        items: selectedItems,
      };

      await postNominationItems(newShopId, nominationData);
      event.target.reset();
      await fetchNominatedShops();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNominatedShops();
    fetchItems();
  }, []);

  if (!nominatedShops || !items) {
    return <div>Loading...</div>;
  }

  return (
    <form className="new-shops-form" onSubmit={handleSubmit}>
      <fieldset className="new-shops-form__shop-details">
        <TextInput
          userLabel={"Shop Name"}
          devLabel={"name"}
          placeholder={"Add the shop's name"}
        />
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
        <TextInput
          userLabel={"Street Name"}
          devLabel={"street_name"}
          placeholder={"Add the street name"}
        />
        <TextInput
          userLabel={"City"}
          devLabel={"city"}
          placeholder={"Add the name of the city the shop is in"}
        />
        <TextInput
          userLabel={"Postcode"}
          devLabel={"postcode"}
          placeholder={"Add the shop's postcode"}
        />
      </fieldset>
      {items.map((item) => {
        return <ItemCheckbox key={item.id} item={item} />;
      })}
      <Button buttonText="Nominate" />
      {missingInput ? <p>{emptyInputMessage}</p> : <></>}
    </form>
  );
};
