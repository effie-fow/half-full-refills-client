import "./ItemCheckbox.scss";
import { useState } from "react";
import { CustomCheckbox } from "../CustomCheckbox/CustomCheckbox";

export const ItemCheckbox = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="item-checkbox">
      <label className="item-checkbox__label">
        <input
          type="checkbox"
          id={item.id}
          name={item.name}
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="item-checkbox__input"
        />
        <CustomCheckbox item={item} checkedState={isChecked} />
      </label>
    </div>
  );
};
