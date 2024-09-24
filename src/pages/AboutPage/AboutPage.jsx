import "./AboutPage.scss";
import { AboutIntro } from "../../components/AboutIntro/AboutIntro";
import { AboutProducts } from "../../components/AboutProducts/AboutProducts";
import { Divider } from "../../components/Divider/Divider";

export const AboutPage = () => {
  return (
    <main className="about">
      <AboutIntro />
      <Divider />
      <AboutProducts />
    </main>
  );
};
