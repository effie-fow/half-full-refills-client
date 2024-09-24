import "./ShopInfoCard.scss";
import { ItemCard } from "../ItemCard/ItemCard";
import { v4 as uuid } from "uuid";

export const ShopInfoCard = ({ shops, clickHandle }) => {
  return (
    <section className="info-card__section">
      {shops.map((shop) => {
        const {
          name,
          street_number,
          street_name,
          city,
          postcode,
          coordinates,
          id,
          items,
        } = shop;

        return (
          <article
            className="info-card__container"
            onClick={() => clickHandle(coordinates)}
            key={id}
          >
            <div className="info-card__shop-details">
              <h2 className="info-card__shop-name">{name}</h2>
              <div className="info-card__address-container">
                <p className="info-card__address-line-1">{`${street_number} ${street_name},`}</p>
                <p className="info-card__address-line-2">{`${city}, ${postcode}`}</p>
              </div>
            </div>
            <div className="info-card__shop-products">
              <article className="info-card__items-list">
                {items.map((item) => {
                  return <ItemCard key={uuid()} item={item} />;
                })}
              </article>
            </div>
          </article>
        );
      })}
    </section>
  );
};
