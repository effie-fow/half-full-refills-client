import "./RegisterPage.scss";
import refillingImg from "../../assets/images/photos/refilling-01.jpg";
import refillingConditionerImg from "../../assets/images/photos/refill-conditioner.jpg";
import { registerUser } from "../../utils/apiUtils";
import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { Divider } from "../../components/Divider/Divider";

export const RegisterPage = ({ handleLogout, isLoggedIn }) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password || !formData.name) {
      setErrorMessage("Please make sure all form fields are filled in.");
      return;
    }

    try {
      await registerUser(formData);
      setErrorMessage("");
      setSuccess(true);
      setFormData({
        email: "",
        password: "",
        name: "",
      });
      event.target[0].value = "";
      event.target[1].value = "";
      event.target[2].value = "";
    } catch (error) {
      setErrorMessage(error);
    }
  };

  if (isLoggedIn) {
    return (
      <main className="logged-in">
        <div className="logged-in__details">
          <span className="logged-in__heading">You are already logged in!</span>
          <p className="logged-in__message">
            To register for a new profile, please log out first.
          </p>
          <span className="logged-in__logout-button" onClick={handleLogout}>
            Logout
          </span>
        </div>
        <img
          src={refillingConditionerImg}
          alt="Hands entering the photo from the right, holding a long glass jar which is being filled with conditioner at a refill pump"
          className="logged-in__img"
        />
      </main>
    );
  }

  return (
    <main className="register">
      <img
        src={refillingImg}
        alt="A hand extending into the frame, refilling a jar of lentils in front of a wall covered in refill containers."
        className="register__hero"
      />
      <div className="register__form-details">
        <h1 className="register__heading">Register</h1>
        <p className="register__instructions">
          Hoping to register and start nominating your favourite refill shops?
          That's great! Please log-in by filling in the form fields below and
          clicking the 'Register' button.
        </p>
      </div>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__form-fields">
          <div className="register__input-container">
            <label htmlFor="registerName" className="register__label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="registerName"
              onChange={handleChange}
              className="register__input"
            />
          </div>
        </div>
        <div className="register__form-fields">
          <div className="register__input-container">
            <label className="register__label" htmlFor="registerEmail">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="registerEmail"
              onChange={handleChange}
              className="register__input"
            />
          </div>
        </div>
        <div className="register__form-fields">
          <div className="register__input-container">
            <label className="register__label" htmlFor="registerPassword">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="registerPassword"
              onChange={handleChange}
              className="register__input"
            />
          </div>
        </div>
        <div className="register__button-container">
          <Button className="register__button" buttonText="Register" />
        </div>
        <div className="register__message-container">
          {errorMessage && <p className="register__message">{errorMessage}</p>}
          {success && (
            <p className="register__message">
              Welcome to the club!{" "}
              <Link className="register__text-link" to="/login">
                Please login here
              </Link>{" "}
              to continue.
            </p>
          )}
        </div>
        <Divider />
      </form>
    </main>
  );
};
