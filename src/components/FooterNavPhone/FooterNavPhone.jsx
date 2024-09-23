import "./FooterNavPhone.scss";

import logoWhite from "../../assets/icons/logo-white.png";
import homeIcon from "../../assets/icons/home-white.svg";
import trophyIcon from "../../assets/icons/trophy-white.svg";
import infoIcon from "../../assets/icons/info-white.svg";
import { NavLink } from "react-router-dom";

export const FooterNavPhone = () => {
  return (
    <footer className="footer-phone">
      <nav className="footer-phone__nav">
        <ul className="footer-phone__text-links">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? "footer-phone__link"
                : isActive
                ? "footer-phone__link footer-phone__link--active"
                : "footer-phone__link"
            }
          >
            <img
              src={homeIcon}
              alt="An icon of a home"
              className="footer-phone__logo"
            />
            <span className="footer-phone__link-text">Home</span>
          </NavLink>
          <NavLink
            to="/shops"
            className={({ isActive, isPending }) =>
              isPending
                ? "footer-phone__link"
                : isActive
                ? "footer-phone__link footer-phone__link--active"
                : "footer-phone__link"
            }
          >
            <img
              src={logoWhite}
              alt="An icon of a half-filled glass"
              className="footer-phone__logo"
            />
            <span className="footer-phone__link-text">Refill</span>
          </NavLink>
          <NavLink
            to="/nominate"
            className={({ isActive, isPending }) =>
              isPending
                ? "footer-phone__link"
                : isActive
                ? "footer-phone__link footer-phone__link--active"
                : "footer-phone__link"
            }
          >
            <img
              src={trophyIcon}
              alt="An icon of a trophy"
              className="footer-phone__logo"
            />
            <span className="footer-phone__link-text">Nominate</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive, isPending }) =>
              isPending
                ? "footer-phone__link"
                : isActive
                ? "footer-phone__link footer-phone__link--active"
                : "footer-phone__link"
            }
          >
            <img
              src={infoIcon}
              alt="An icon of an 'i' in a circle"
              className="footer-phone__logo"
            />
            <span className="footer-phone__link-text">About</span>
          </NavLink>
        </ul>
      </nav>
    </footer>
  );
};
