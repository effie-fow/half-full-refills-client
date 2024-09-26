import "./LoginRequiredPage.scss";
import ghostIcon from "../../assets/icons/ghost-green.svg";
import { TransitionDefault } from "../../components/TransitionDefault/TransitionDefault";
import { useEffect } from "react";

export const LoginRequiredPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <TransitionDefault
      user="friend"
      icon={ghostIcon}
      topLine="Woah, who goes there?"
      tagLine="Please login or register in order to nominate."
      details=""
      buttonOneLink="/login"
      buttonOneText="Login"
      buttonTwoLink="/register"
      buttonTwoText="Register"
    />
  );
};
