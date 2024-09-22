import "./CustomCheckbox.scss";
import { assignDarkIcon, assignLightIcon } from "../../utils/assignIcon";

export const CustomCheckbox = ({ item, checkedState }) => {
  return (
    <div className="custom-checkbox">
      <div
        className={`custom-checkbox__icon-container ${
          checkedState ? "" : "custom-checkbox__icon-container--light"
        }`}
      >
        <img
          src={
            checkedState
              ? assignLightIcon(item.name)
              : assignDarkIcon(item.name)
          }
          alt={`A small ${item.formatted_name} icon`}
          className="custom-checkbox__icon"
        />
      </div>
      <span className="custom-checkbox__item-name">{item.formatted_name}</span>
    </div>
  );
};
