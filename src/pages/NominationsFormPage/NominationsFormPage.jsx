import "./NominationsFormPage.scss";
import { NominationsFormExistingShop } from "../../components/NominationsFormExistingShop/NominationsFormExistingShop";
import { NominationsFormNewShop } from "../../components/NominationsFormNewShop/NominationsFormNewShop";
import { useState } from "react";

export const NominationsFormPage = () => {
  const [formType, setFormType] = useState("Add New Shop to Nominate");

  const handleFormType = () => {
    formType === "Add New Shop to Nominate"
      ? setFormType("Nominate Existing Shop")
      : setFormType("Add New Shop to Nominate");
  };

  return (
    <main className="nominations-page">
      <span
        className="nominations-page__change-form-button"
        onClick={handleFormType}
      >
        {formType}
      </span>
      {formType === "Add New Shop to Nominate" ? (
        <NominationsFormExistingShop />
      ) : (
        <NominationsFormNewShop />
      )}
    </main>
  );
};
