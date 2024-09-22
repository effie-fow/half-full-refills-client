import "./ItemCard.scss";
import veganIcon from "../../assets/icons/vegan-dark.svg";

export const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <img
        src={veganIcon}
        alt="A small plant icon"
        className="item-card__icon"
      />
      <span className="item-card__item-name">{item.formatted_name}</span>
    </div>
  );
};
