import "./ShopsIntro.scss";
import { Link } from "react-router-dom";

export const ShopsIntro = () => {
  return (
    <section className="shops-intro">
      <h1 className="shops-intro__heading">Refill</h1>
      <span className="shops-intro__tagline">
        Looking to top-up your favourite products?
      </span>
      <p className="shops-intro__page-description">
        Our nomination-based system ensures the shops listed below have been
        verified by other people just like you. Please feel free to either
        browse the map, or if you're looking for something or somewhere
        specific, just fill in the form by clicking the button below.
      </p>
      <p className="shops-intro__page-description">
        If there's a shop you love that you don't see here, please head over to
        our{" "}
        <Link to="/nominate" className="shops-intro__text-link">
          nominations page
        </Link>{" "}
        to tell us about it!
      </p>
      <p className="shops-intro__page-description">
        To complete the form below, you may search by location using the text
        field and/or click the items and shop requirements that you're looking
        for. Once you've completed the form, click 'find shops', and we'll list
        all shops that match your criteria. We hope you find what you're looking
        for!
      </p>
    </section>
  );
};
