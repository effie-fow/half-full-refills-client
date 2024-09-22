import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NominationsFormPage } from "./pages/NominationsFormPage/NominationsFormPage";
import { ShopsBrowsePage } from "./pages/ShopsBrowsePage/ShopsBrowsePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nominate" element={<NominationsFormPage />} />
        <Route path="/shops" element={<ShopsBrowsePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
