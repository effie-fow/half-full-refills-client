import "./ItemCard.scss";
import { assignDarkIcon } from "../../utils/assignIcon";

export const ItemCard = ({ item }) => {
  const icon = assignDarkIcon(item.name);

  return (
    <div className="item-card">
      <div className="item-card__icon-container">
        <img
          src={icon}
          alt={`A small ${item.formatted_name} icon`}
          className="item-card__icon"
        />
      </div>
      <span className="item-card__item-name">{item.formatted_name}</span>
    </div>
  );
};
