import "./HomeHero.scss";
import logoFull from "../../assets/icons/logo-full.png";

export const HomeHero = () => {
  return (
    <section className="hero">
      <div className="hero__overlay">
        <img src={logoFull} alt="Half Full" className="hero__logo" />
        <span className="hero__subheading">
          Connecting you to the best produce in your community.
        </span>
      </div>
    </section>
  );
};
