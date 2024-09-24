import "./Home.scss";
import { Divider } from "../../components/Divider/Divider";
import { HomeHero } from "../../components/HomeHero/HomeHero";
import { HomeRefills } from "../../components/HomeRefills/HomeRefills";
import { HomeNominate } from "../../components/HomeNominate/HomeNominate";
import { HomeAbout } from "../../components/HomeAbout/HomeAbout";

export const Home = () => {
  return (
    <main className="home">
      <HomeHero />
      <section className="home__signposts">
        <HomeRefills />
        <Divider />
        <HomeNominate />
      </section>
      <HomeAbout />
    </main>
  );
};
