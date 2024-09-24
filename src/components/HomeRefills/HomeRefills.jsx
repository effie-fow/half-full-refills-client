import "./HomeRefills.scss";
import { Link } from "react-router-dom";

export const HomeRefills = () => {
  return (
    <article className="home-refills">
      <p className="home-refills__details">
        We aim to make it <span className="home-refills__emphasis">easy</span>{" "}
        for you to support local people and businesses,
        <span className="home__emphasis"> feel good</span> about your waste free
        shopping, and <span className="home-refills__emphasis">eat well</span>.
      </p>
      <Link to="/shops" className="home-refills__button">
        Find Refill Shops
      </Link>
    </article>
  );
};
