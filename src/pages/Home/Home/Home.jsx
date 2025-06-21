import Banner from "../Banner/Banner";
import FeaturesSection from "../Features/FeaturesSection";
import HowWorks from "../HowWorks/HowWorks";
import Services from "../Services/Services";
import SponsorsSection from "../Sponsors/Sponsors";

function Home() {
  return (
    <div>
      <Banner />
      <HowWorks />
      <Services />
      <SponsorsSection />
      <FeaturesSection />
    </div>
  );
}
export default Home;
