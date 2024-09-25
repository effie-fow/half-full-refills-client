import "./LoginPage.scss";
import { useState } from "react";
import { getUserData, loginUser } from "../../utils/apiUtils";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { Divider } from "../../components/Divider/Divider";

export const LoginPage = ({ setIsLoggedIn, setUser, isLoggedIn }) => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("You must provide a username and a password");
      return;
    }

    if (isLoggedIn) {
      setMessage("No need to login, you're still logged in from last time!");
      return;
    }

    try {
      const data = await loginUser(formData);
      const userData = await getUserData(data.authToken);

      localStorage.setItem("authToken", data.authToken);
      setIsLoggedIn(true);
      setUser({ name: userData.name, id: userData.id });
      setMessage(`Welcome back, ${userData.name}! You are now logged in.`);
      event.target[0].value = "";
      event.target[1].value = "";
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      setMessage(
        "Either your email address or password is unrecognised, please try again."
      );
      setIsLoggedIn(false);
      localStorage.removeItem("authToken");
    }
  };

  return (
    <main className="login">
      <div className="login__form-details">
        <h1 className="login__heading">Login</h1>
        <p className="login__instructions">
          Please log-in by writing your email address and password in the fields
          below and clicking the 'Login' button. If you haven't registered with
          us before, you'll need to{" "}
          <Link to="/register" className="login__text-link">
            do that here first
          </Link>
          .
        </p>
      </div>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__form-fields">
          <div className="login__input-container">
            <label className="login__form-label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              className="login__form-input"
            />
          </div>
          <div className="login__input-container">
            <label className="login__form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className="login__form-input"
            />
          </div>
        </div>
        <div className="login__button-container">
          <Button className="login__button" buttonText="Login" />
        </div>
        <div className="login__message-container">
          {message && <p className="login__message">{message}</p>}
        </div>
        <Divider />
      </form>
    </main>
  );
};
