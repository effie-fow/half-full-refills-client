import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NominationsFormPage } from "./pages/NominationsFormPage/NominationsFormPage";
import { ShopsBrowsePage } from "./pages/ShopsBrowsePage/ShopsBrowsePage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { Header } from "./components/Header/Header";
import { FooterNavPhone } from "./components/FooterNavPhone/FooterNavPhone";
import { Footer } from "./components/Footer/Footer";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { ServerErrorPage } from "./pages/ServerErrorPage/ServerErrorPage";
import { useEffect, useState } from "react";
import { LoginRequiredPage } from "./pages/LoginRequiredPage/LoginRequiredPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Header handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/nominate"
          element={<NominationsFormPage isLoggedIn={isLoggedIn} />}
        />
        <Route path="/shops" element={<ShopsBrowsePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/register"
          element={
            <RegisterPage
              handleLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          }
        />
        <Route path="/login-register" element={<LoginRequiredPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
      </Routes>
      <FooterNavPhone />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
