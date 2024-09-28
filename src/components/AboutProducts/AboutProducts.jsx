import "./AboutProducts.scss";

export const AboutProducts = () => {
  return (
    <section className="about-products">
      <h2 className="about-products__section-heading">Our Categories</h2>
      <p className="about-products__description">
        We know some of our categories may seem broad, but we have selected them
        because we believe they capture most 'everyday items' and/or are
        important features for customers to know about.
      </p>
      <span className="about-products__reminder">Remember...</span>
      <p className="about-products__tagline">
        We are not just asking if the shop sells these items. We specifically
        want to celebrate and signpost to independent shops in which these items
        are both 'refillable' (can be purchased without packaging), and organic.
        So if the shop you're thinking matches that criteria, we'd love to hear
        about it!
      </p>
    </section>
  );
};
