import "./ServerErrorPage.scss";
import emptyGlassIcon from "../../assets/icons/empty-glass-green.png";
import { Link } from "react-router-dom";

export const ServerErrorPage = () => {
  return (
    <main className="server-error">
      <img
        src={emptyGlassIcon}
        alt="An icon of an empty glass"
        className="server-error__icon"
      />
      <span className="server-error__heading">It's not you, it's us . . .</span>
      <span className="server-error__details">
        We're having issues accessing our server right now. Please come back
        later.
      </span>
    </main>
  );
};
