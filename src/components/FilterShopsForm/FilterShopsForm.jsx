import "./FilterShopsForm.scss";
import {
  getAllItems,
  getShopsByCity,
  getShopsByCityAndItems,
  getShopsByItems,
} from "../../utils/apiUtils";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import { ItemCheckbox } from "../ItemCheckbox/ItemCheckbox";

export const FilterShopsForm = ({ setShops, setShopSearchMessage }) => {
  const [items, setItems] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const searchedCity = event.target[0].value;

    const selectedItems = [];
    const strictSearch = event.target[20].checked;

    for (let i = 1; i < items.length + 1; i++) {
      if (event.target[i].checked) {
        selectedItems.push(event.target[i].name);
      }
    }

    try {
      if (searchedCity && !selectedItems.length) {
        const foundShops = await fetchShopsByCity(searchedCity);

        if (!foundShops.length) {
          setShopSearchMessage(`Sorry, no shops found in ${searchedCity}!`);
          setTimeout(() => setShopSearchMessage(""), 3000);
          return;
        }

        if (foundShops) {
          setShops(foundShops);
        }
      }

      if (selectedItems.length && !searchedCity) {
        const foundShops = await getShopsByItems(selectedItems, strictSearch);

        if (!foundShops.length) {
          setShopSearchMessage(
            `Sorry, we couldn't find any shops that meet your criteria!`
          );
          setTimeout(() => setShopSearchMessage(""), 3000);
          return;
        }

        if (foundShops) {
          setShops(foundShops);
          foundShops.length === 1
            ? setShopSearchMessage(
                `1 is better than nothing, check out ${foundShops[0].name}!`
              )
            : setShopSearchMessage(
                `Great news, we found ${foundShops.length} shops that match your criteria!`
              );
          setTimeout(() => setShopSearchMessage(""), 4000);
        }
      }

      if (selectedItems.length && searchedCity) {
        const foundShops = await getShopsByCityAndItems(
          searchedCity,
          selectedItems,
          strictSearch
        );

        if (!foundShops.length) {
          setShopSearchMessage(
            `Sorry, we couldn't find any shops that meet your criteria!`
          );
          setTimeout(() => setShopSearchMessage(""), 3000);
          return;
        }

        if (foundShops) {
          setShops(foundShops);
          foundShops.length === 1
            ? setShopSearchMessage(
                `1 is better than nothing, check out ${foundShops[0].name}!`
              )
            : setShopSearchMessage(
                `Great news, we found ${foundShops.length} shops that match your criteria in ${searchedCity}!`
              );
          setTimeout(() => setShopSearchMessage(""), 4000);
        }
      }

      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchShopsByCity = async (city) => {
    try {
      const activeShops = await getShopsByCity(city);
      return activeShops;
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

  useEffect(() => {
    fetchItems();
  }, []);

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="filter-shops-form">
      <TextInput
        userLabel={"Search by City"}
        devLabel={"city"}
        placeholder={"Write a city's name"}
      />
      <fieldset className="filter-shops-form__checkboxes">
        {items.map((item) => {
          return <ItemCheckbox key={item.id} item={item} />;
        })}
      </fieldset>
      <label
        htmlFor="match_type"
        className="filter-shops-form__strict-search-label"
      >
        <input
          type="checkbox"
          name="match_type"
          id="match_type"
          className="filter-shops-form__strict-search-checkbox"
        />
        Only show shops which meet all of my requirements
      </label>
      <Button buttonText="Find Shops" />
    </form>
  );
};
