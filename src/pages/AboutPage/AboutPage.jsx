import "./AboutPage.scss";
import { AboutIntro } from "../../components/AboutIntro/AboutIntro";
import { AboutProducts } from "../../components/AboutProducts/AboutProducts";
import { Divider } from "../../components/Divider/Divider";
import { useEffect } from "react";

export const AboutPage = () => {
  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

  return (
    <main className="about">
      <AboutIntro />
      <Divider />
      <AboutProducts />
    </main>
  );
};
