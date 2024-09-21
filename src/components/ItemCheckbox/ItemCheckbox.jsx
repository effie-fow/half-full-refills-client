import "./ItemCheckbox.scss";

export const ItemCheckbox = ({ item }) => {
  return (
    <div className="item-checkbox">
      <input
        type="checkbox"
        id={item.id}
        name={item.name}
        className="item-checkbox__input"
      />
      <label htmlFor={item.name} className="item-checkbox__label">
        {item.formatted_name}
      </label>
    </div>
  );
};
