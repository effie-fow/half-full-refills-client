import trophyIcon from "../../../assets/icons/trophy-green.svg";
import { useEffect } from "react";
import { TransitionDefault } from "../../../components/TransitionDefault/TransitionDefault";

export const ShopActivatedPage = ({ user }) => {
  useEffect(() => window.scrollTo(0, 0), []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <TransitionDefault
      user={user}
      icon={trophyIcon}
      topLine={`You submitted the 100th nomination, ${user.name}!`}
      tagLine="The shop is now verified and on the Half Full map!"
      details="Thank you for contributing to our community and helping signpost other people to one of your favourite spots. Happy Refilling!"
      buttonOneLink="/nominate"
      buttonOneText="Nominate another shop"
      buttonTwoLink="/shops"
      buttonTwoText="See my shop on the map"
    />
  );
};
