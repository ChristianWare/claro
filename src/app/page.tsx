import Hero from "@/components/Hero/Hero";
import Popular from "@/components/Popular/Popular";
import Usp from "@/components/Usp/Usp";

const HomePage = async () => {
  return (
    <main>
      <Hero />
      <Popular />
      <Usp />
      <Usp />
      <Usp />
    </main>
  );
};

export default HomePage;
