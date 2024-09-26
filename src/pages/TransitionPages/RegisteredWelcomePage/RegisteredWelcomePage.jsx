import welcomeIcon from "../../../assets/icons/welcome-green.svg";
import { useEffect } from "react";
import { TransitionDefault } from "../../../components/TransitionDefault/TransitionDefault";

export const RegisteredWelcomePage = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <TransitionDefault
      user="friend"
      icon={welcomeIcon}
      topLine={`Welcome to Half Full Refills!`}
      tagLine="Our app is now yours to peruse!"
      details="Looking for inspiration? We'd recommend heading to the Refill page to browse some great shops. Or sign in and head to the Nominate page to get your favourite spot on the map!"
      buttonOneLink="/shops"
      buttonOneText="Browse Refill Shops"
      buttonTwoLink="/login"
      buttonTwoText="Login and Nominate"
    />
  );
};
