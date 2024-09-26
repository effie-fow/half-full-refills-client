import "./ServerErrorPage.scss";
import emptyGlassIcon from "../../assets/icons/empty-glass-green.png";
import { useEffect } from "react";

export const ServerErrorPage = () => {
  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

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
