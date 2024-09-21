import "./Button.scss";

export const Button = ({ buttonText }) => {
  return (
    <button type="submit" className="button">
      {buttonText}
    </button>
  );
};
