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
import { CheckboxInstructions } from "../CheckboxInstructions/CheckboxInstructions";
import { Divider } from "../Divider/Divider";
import { Navigate } from "react-router-dom";

export const FilterShopsForm = ({
  setShops,
  setShopSearchMessage,
  searchScrollRef,
}) => {
  const [items, setItems] = useState(null);
  const [serverDown, setServerDown] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const searchedCity = event.target[0].value;

    const selectedItems = [];
    const strictSearch = event.target[20].checked;

    for (let i = 2; i < items.length + 2; i++) {
      if (event.target[i].checked) {
        selectedItems.push(event.target[i].name);
      }
    }

    if (!searchedCity && !selectedItems.length) {
      setShopSearchMessage(
        `If you're looking for something specific, we can only help you if you tell us what it is...`
      );
      setTimeout(() => setShopSearchMessage(""), 6000);
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
          foundShops.length === 1
            ? setShopSearchMessage(
                `We found one shop in ${searchedCity} that we think you'll like!`
              )
            : setShopSearchMessage(
                `Happy days, we found ${foundShops.length} shops in ${searchedCity} that you're going to love!`
              );
          setTimeout(() => setShopSearchMessage(""), 5000);
          searchScrollRef.current.scrollIntoView({ behavior: "smooth" });
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
          searchScrollRef.current.scrollIntoView({ behavior: "smooth" });
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
          searchScrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }

      event.target.reset();
    } catch (error) {
      console.error(error);
      setServerDown(true);
    }
  };

  const fetchShopsByCity = async (city) => {
    try {
      const activeShops = await getShopsByCity(city);
      return activeShops;
    } catch (error) {
      console.error(error);
      setServerDown(true);
    }
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

  useEffect(() => {
    fetchItems();
  }, []);

  if (!items) {
    return <div>Loading...</div>;
  }

  if (serverDown) {
    return <Navigate to="/500" />;
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit} className="filter-shops-form">
        <CheckboxInstructions type="search-city" />
        <div className="filter-shops-form__search-container">
          <TextInput
            userLabel={"Search by City"}
            devLabel={"city"}
            placeholder={"Write a city's name"}
          />
        </div>
        <Divider />
        <div className="filter-shops-form__checkboxes-container">
          <CheckboxInstructions type="search" />
          <fieldset className="filter-shops-form__checkboxes">
            {items.map((item) => {
              return <ItemCheckbox key={item.id} item={item} />;
            })}
          </fieldset>
        </div>
        <div className="filter-shops-form__strict-search-container">
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
            Only show me shops which meet all my criteria
          </label>
        </div>
        <div className="filter-shops-form__button-container">
          <Button buttonText="Find Shops" />
        </div>
        <Divider />
      </form>
    </>
  );
};
