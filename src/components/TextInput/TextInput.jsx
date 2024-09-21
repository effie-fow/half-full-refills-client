import "./TextInput.scss";

export const TextInput = ({ userLabel, devLabel, placeholder }) => {
  return (
    <div className="text-input__container">
      <label htmlFor={devLabel} className="text-input__label">
        {`${userLabel}: `}
      </label>
      <input
        type="text"
        id={devLabel}
        name={devLabel}
        placeholder={placeholder}
        className="text-input__input"
      />
    </div>
  );
};
