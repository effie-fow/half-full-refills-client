import "./HomeNominate.scss";
import { Link } from "react-router-dom";
import checklistIcon from "../../assets/icons/form-ticks-green.svg";
import arrowIcon from "../../assets/icons/arrow-green.svg";
import trophyIcon from "../../assets/icons/filled-trophy-green.png";

export const HomeNominate = () => {
  return (
    <article className="home-nominate">
      <div className="home-nominate__info">
        <div className="home-nominate__icons">
          <img
            src={checklistIcon}
            alt="checklist icon"
            className="home-nominate__checklist-icon"
          />
          <img
            src={arrowIcon}
            alt="arrow pointing right"
            className="home-nominate__arrow-icon"
          />
          <img
            src={trophyIcon}
            alt="trophy icon"
            className="home-nominate__trophy-icon"
          />
        </div>
        <div className="home-nominate__details">
          <h2 className="home-nominate__heading">Nominate</h2>
          <p className="home-nominate__text">
            Do you know of a local shop that aligns with our values? Fill in our
            short nomination form and help to get them on the map!
          </p>
        </div>
      </div>
      <div className="home-nominate__button-container">
        <Link to="/nominate" className="home-nominate__button">
          Nominate a Shop
        </Link>
      </div>
    </article>
  );
};
