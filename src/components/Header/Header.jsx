import "./Header.scss";
import logoWhite from "../../assets/icons/logo-white.png";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/">
          <img
            src={logoWhite}
            alt="An icon of a half filled glass"
            className="header__logo"
          />
        </Link>
        <ul className="header__text-links">
          <NavLink
            to="/shops"
            className={({ isActive, isPending }) =>
              isPending
                ? "header__link"
                : isActive
                ? "header__link header__link--active"
                : "header__link"
            }
          >
            Refill
          </NavLink>
          <NavLink
            to="/nominate"
            className={({ isActive, isPending }) =>
              isPending
                ? "header__link"
                : isActive
                ? "header__link header__link--active"
                : "header__link"
            }
          >
            Nominate
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive, isPending }) =>
              isPending
                ? "header__link"
                : isActive
                ? "header__link header__link--active"
                : "header__link"
            }
          >
            About
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};
