import "./LoginRequiredPage.scss";
import ghostIcon from "../../assets/icons/ghost-green.svg";
import { Link } from "react-router-dom";

export const LoginRequiredPage = () => {
  return (
    <main className="login-required">
      <div className="login-required__icon-container">
        <img
          src={ghostIcon}
          alt="An icon of a ghost"
          className="login-required__icon"
        />
      </div>
      <div className="login-required__details">
        <span className="login-required__heading">Woah, who goes there?</span>
        <p className="login-required__message">
          We're pleased to see you're keen to contribute to our nominations
          page, but you'll need to be logged in first.
        </p>
        <p className="login-required__message">
          If it's your first time nominating, please click 'register' below and
          we'll get you sorted in no time!
        </p>
        <div className="login-required__buttons-container">
          <Link to="/login" className="login-required__login-button">
            Login
          </Link>
          <Link to="/register" className="login-required__register-button">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
};
