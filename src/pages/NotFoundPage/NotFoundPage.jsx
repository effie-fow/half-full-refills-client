import "./NotFoundPage.scss";
import signpostIcon from "../../assets/icons/signpost-green.svg";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <main className="not-found">
      <img
        src={signpostIcon}
        alt="A broken and battered signpost silhouette"
        className="not-found__icon"
      />
      <span className="not-found__heading">
        Well, that's not a good sign . . .
      </span>
      <span className="not-found__details">
        Looks like the page you're looking for doesn't exist.
      </span>
      <Link to="/" className="not-found__link">
        Return home?
      </Link>
    </main>
  );
};
