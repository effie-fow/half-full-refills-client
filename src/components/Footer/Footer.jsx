import "./Footer.scss";
import logoWhite from "../../assets/icons/logo-full-white.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer__nav">
        <Link to="/" className="footer__logo-container">
          <img src={logoWhite} alt="Half Full" className="footer__logo" />
        </Link>
        <ul className="footer__text-links">
          <Link to="/shops" className="footer__link">
            Refill
          </Link>
          <Link to="/nominate" className="footer__link footer__link--middle">
            Nominate
          </Link>
          <Link to="/about" className="footer__link">
            About
          </Link>
        </ul>
      </nav>
    </footer>
  );
};
