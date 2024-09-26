import voteIcon from "../../../assets/icons/vote-green.svg";
import { TransitionDefault } from "../../../components/TransitionDefault/TransitionDefault";
import { useEffect } from "react";

export const NominationSuccessfulPage = ({ user }) => {
  useEffect(() => window.scrollTo(0, 0), []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <TransitionDefault
      user={user}
      icon={voteIcon}
      topLine={`Thanks for your nomination, ${user.name}!`}
      tagLine="Your shop is one step closer to being verified!"
      details="Once it has received 100 nominations, it'll be added to the Half Full map. So, keep spreading the word, and thank you!"
      buttonOneLink="/nominate"
      buttonOneText="Nominate another shop"
      buttonTwoLink="/shops"
      buttonTwoText="Browse Refill Shops"
    />
  );
};
