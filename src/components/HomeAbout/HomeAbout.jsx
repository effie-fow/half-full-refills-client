import "./HomeAbout.scss";
import { Link } from "react-router-dom";
import butterflyIcon from "../../assets/icons/butterfly-light.svg";
import plantPotIcon from "../../assets/icons/bowl-light.svg";
import plantIcon from "../../assets/icons/plant-light.svg";

export const HomeAbout = () => {
  return (
    <section className="home-about">
      <div className="home-about__sub-container">
        <div className="home-about__details">
          <h2 className="home-about__heading">About Half-Full</h2>
          <p className="home-about__description">
            We value our locality, ourselves and the world around us. We have
            hope that people want to support each other.
          </p>
          <p className="home-about__description">
            We know that progress can be achieved when communities come
            together, and we are excited to play a small part in it.
          </p>
          <Link className="home-about__link" to="/about">
            Find out more
          </Link>
        </div>
        <div className="home-about__icons-container">
          <div className="home-about__butterfly-container">
            <img
              src={butterflyIcon}
              alt="A silhouette of a butterfly"
              className="home-about__butterfly-icon"
            />
          </div>
          <img
            src={plantIcon}
            alt="A leafy plant"
            className="home-about__plant-icon"
          />
          <img
            src={plantPotIcon}
            alt="A small plant pot icon"
            className="home-about__plant-pot-icon"
          />
        </div>
      </div>
    </section>
  );
};
