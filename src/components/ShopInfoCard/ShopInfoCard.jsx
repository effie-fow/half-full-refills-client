import "./ShopInfoCard.scss";
import { ItemCard } from "../ItemCard/ItemCard";
import { v4 as uuid } from "uuid";

export const ShopInfoCard = ({ shops, clickHandle }) => {
  return (
    <section className="info-card__container">
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
          <article onClick={() => clickHandle(coordinates)} key={id}>
            <h2>{name}</h2>
            <p>{`${street_number} ${street_name}`}</p>
            <p>{`${city}, ${postcode}`}</p>
            <article className="info-card__items-list">
              {items.map((item) => {
                return <ItemCard key={uuid()} item={item} />;
              })}
            </article>
          </article>
        );
      })}
    </section>
  );
};
