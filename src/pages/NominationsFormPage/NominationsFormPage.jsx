import "./NominationsFormPage.scss";
import { NominationsFormExistingShop } from "../../components/NominationsFormExistingShop/NominationsFormExistingShop";
import { NominationsFormNewShop } from "../../components/NominationsFormNewShop/NominationsFormNewShop";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export const NominationsFormPage = ({ isLoggedIn, user }) => {
  const [formType, setFormType] = useState("+ Add New Shop");
  const [redirect, setRedirect] = useState(false);

  const handleFormType = () => {
    formType === "+ Add New Shop"
      ? setFormType("Nominate Existing Shop")
      : setFormType("+ Add New Shop");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      if (!isLoggedIn) {
        setRedirect(true);
      }
    }, 3000);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="nominations-page__loader-redirect">
        <Loader />
        {redirect ? <Navigate to="/login-register" /> : <></>}
      </div>
    );
  }

  return (
    <main className="nominations-page">
      <section className="nominations-page__intro">
        <h1 className="nominations-page__heading">Nominate</h1>
        <span className="nominations-page__tagline">
          {`Ready to support your local community, ${user.name}?`}
        </span>
        <p className="nominations-page__page-description">
          Thank you for taking the time to nominate one of your favourite spots!
          If this is your first time nominating, please make sure to check out
          our{" "}
          <Link to="/about" className="nominations-page__text-link">
            about page
          </Link>{" "}
          to familiarise yourself with our categories and the types of shops we
          love.
        </p>
        <p className="nominations-page__page-description">
          Please check out our existing nominated shops using the dropdown below
          before adding a new shop, because someone might already have had the
          same great idea as you!
        </p>
        <p className="nominations-page__page-description">
          To complete the form below, select or add a shop and select all the
          icons which apply to the shop you're nominating. Once you're ready to
          submit, click the 'nominate' button.
        </p>
      </section>
      <section className="nominations-page__form">
        <h2 className="nominations-page__section-heading">Nomination Form</h2>
        <span
          className="nominations-page__change-form-button"
          onClick={handleFormType}
        >
          {formType}
        </span>
        {formType === "+ Add New Shop" ? (
          <NominationsFormExistingShop user={user} />
        ) : (
          <NominationsFormNewShop user={user} />
        )}
      </section>
    </main>
  );
};
