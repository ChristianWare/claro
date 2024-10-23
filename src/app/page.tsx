import Hero from "@/components/Hero/Hero";
import Popular from "@/components/Popular/Popular";
import Usp from "@/components/Usp/Usp";
import Uspii from "@/components/Uspii/Uspii";

const HomePage = async () => {
  return (
    <main>
      <Hero />
      <Popular />
      <Usp />
      <Uspii />
    </main>
  );
};

export default HomePage;
