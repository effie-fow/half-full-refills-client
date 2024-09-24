import "./CheckboxInstructions.scss";

export const CheckboxInstructions = ({ type = "" }) => {
  if (type === "search") {
    return (
      <div className="checkbox-instructions">
        <h3 className="checkbox-instructions__heading">
          Available Refills & Shop Features
        </h3>
        <span className="checkbox-instructions__description">
          Please select the items you're looking for, and if the shop should be
          vegan, vegan-friendly and/or step-free.
        </span>
      </div>
    );
  }

  if (type === "search-city") {
    return (
      <div className="checkbox-instructions">
        <h3 className="checkbox-instructions__heading">Location</h3>
        <span className="checkbox-instructions__description">
          Which city would you like to search in?
        </span>
      </div>
    );
  }

  return (
    <div className="checkbox-instructions">
      <h3 className="checkbox-instructions__heading">
        Available Refills & Shop Features
      </h3>
      <span className="checkbox-instructions__description">
        Please select the items that are available for purchase without
        packaging at your nominated shop, and let us know if the shop is vegan,
        vegan-friendly and/or step-free.
      </span>
    </div>
  );
};
