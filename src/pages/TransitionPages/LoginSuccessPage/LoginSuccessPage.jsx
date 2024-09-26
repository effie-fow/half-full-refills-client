import welcomeIcon from "../../../assets/icons/welcome-green.svg";
import { TransitionDefault } from "../../../components/TransitionDefault/TransitionDefault";
import { useEffect } from "react";

export const LoginSuccessPage = ({ user }) => {
  useEffect(() => window.scrollTo(0, 0), []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <TransitionDefault
      user={user}
      icon={welcomeIcon}
      topLine={`Hey, ${user.name}!`}
      tagLine="Where to?"
      details=""
      buttonOneLink="/nominate"
      buttonOneText="Nominate"
      buttonTwoLink="/shops"
      buttonTwoText="Browse"
    />
  );
};
