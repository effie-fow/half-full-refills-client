import { useEffect } from "react";
import shopIcon from "../../../assets/icons/shop-green.svg";
import { TransitionDefault } from "../../../components/TransitionDefault/TransitionDefault";

export const NewShopAddedPage = ({ user }) => {
  useEffect(() => window.scrollTo(0, 0), []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <TransitionDefault
      user={user}
      icon={shopIcon}
      topLine={`Great news, ${user.name},`}
      tagLine="Your shop has been added to our nominations list!"
      details="Other users will now be able to see your favourite shop. Once it has received 100 nominations, it'll be added to the Half Full map. So, keep spreading the word, and thank you!"
      buttonOneLink="/"
      buttonOneText="Back to Home Page"
      buttonTwoLink="/shops"
      buttonTwoText="Browse Refill Shops"
    />
  );
};
