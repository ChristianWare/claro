import FinalCTA from "@/components/FinalCTA/FinalCTA";
import Hero from "@/components/Hero/Hero";
import Popular from "@/components/Popular/Popular";
import TakeControl from "@/components/TakeControl/TakeControl";
import Usp from "@/components/Usp/Usp";
import Uspii from "@/components/Uspii/Uspii";
import VideoUsp from "@/components/VideoUsp/VideoUsp";

const HomePage = async () => {
  return (
    <main>
      <Hero />
      <Popular />
      <Usp />
      <Uspii />
      <VideoUsp />
      <TakeControl />
      <FinalCTA />
    </main>
  );
};

export default HomePage;
