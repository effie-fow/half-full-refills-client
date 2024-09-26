import { Link } from "react-router-dom";
import "./TransitionDefault.scss";

export const TransitionDefault = ({
  user,
  icon,
  topLine,
  tagLine,
  details,
  buttonOneLink,
  buttonOneText,
  buttonTwoLink,
  buttonTwoText,
}) => {
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main className="transition">
      <div className="transition__animation-container">
        <img src={icon} alt="" className="transition__icon" />
      </div>
      <div className="transition__message-container">
        <span className="transition__heading">{topLine}</span>
        <span className="transition__subheading">{tagLine}</span>
        <span className="transition__details">{details}</span>
      </div>
      <div className="transition__buttons-container">
        <Link to={buttonOneLink} className="transition__home-button">
          {buttonOneText}
        </Link>
        <Link to={buttonTwoLink} className="transition__refill-button">
          {buttonTwoText}
        </Link>
      </div>
    </main>
  );
};
