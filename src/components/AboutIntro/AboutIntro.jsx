import { Link } from "react-router-dom";
import refillJars from "../../assets/images/photos/refill-jars.jpg";
import "./AboutIntro.scss";

export const AboutIntro = () => {
  return (
    <section className="about-intro">
      <img
        src={refillJars}
        alt="Glass jars filled with nuts, dried fruits and rice on a shelf"
        className="about-intro__hero"
      />
      <h1 className="about-intro__heading">About Half Full</h1>
      <span className="about-intro__tagline">
        Half Full refills is the modest store locator connecting you to the best
        produce and products in your community. We aim to make it easy to
        support local people and businesses, feel good about your waste-free
        shopping, and eat well.
      </span>
      <h2 className="about-intro__section-heading">Why we exist</h2>
      <p className="about-intro__page-description">
        Articulated well by{" "}
        <a
          target="blank"
          href="https://shoplocaluk.org/reasons-why/"
          className="about-intro__text-link"
        >
          Shop Local's '10 Reasons Why'
        </a>
        , supporting local businesses recirculates money locally, preserves your
        community and reduces your carbon footprint.
      </p>
      <p className="about-intro__page-description">
        A range of studies highlighted by{" "}
        <a
          target="blank"
          href="https://www.readability.co.uk/blog/sustainability-statistics-that-might-shock-you/#:~:text=76%25%20of%20consumers%20choose%20paper,over%20plastic%20for%20environmental%20reasons."
          className="about-intro__text-link"
        >
          Readability
        </a>{" "}
        all point to the fact that the majority of UK consumers want to shop
        plastic-free, are willing to pay more for sustainable packaging and
        "expect brands to act sustainably". And yet, when asked 'where do you
        regularly buy food and products for everyday use?', 83% of UK
        respondents said Supermarkets, with only 10% reporting Organic Food
        Stores (
        <a
          target="blank"
          href="https://www.statista.com/forecasts/997923/grocery-shopping-by-store-type-in-the-uk"
          className="about-intro__text-link"
        >
          June 2024
        </a>
        ).
      </p>
      <p className="about-intro__page-description">
        So we jump to blogs, community boards and Reddit, where shopping local
        is "too expensive" and "time consuming". In short, people seem to agree
        that it is a good thing to do, but ultimately don't see sustainable
        shopping as a sustainable lifestyle. It's not accessible.
      </p>
      <p className="about-intro__page-description">
        At Half-Full, we still have hope that this can change. We are not under
        any illusions that shopping organic and locally can be more
        time-consuming. But, we believe it's worth it, and believe more people
        would shop the way we like to if they knew where to go.
      </p>
      <p className="about-intro__page-description">
        Our app celebrates and connects you to your local businesses that
        provide waste-free shopping. Use our simple filters to find what you're
        looking for, and{" "}
        <Link className="about-intro__text-link" to="/shops">
          get refilling
        </Link>
        .
      </p>
      <p className="about-intro__page-description">
        Know of a local shop that aligns with our values?{" "}
        <Link className="about-intro__text-link" to="/nominate">
          Fill in our short nomination form
        </Link>{" "}
        and help to get them on the map!
      </p>
    </section>
  );
};
