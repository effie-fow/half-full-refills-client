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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nominate" element={<NominationsFormPage />} />
        <Route path="/shops" element={<ShopsBrowsePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <FooterNavPhone />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
