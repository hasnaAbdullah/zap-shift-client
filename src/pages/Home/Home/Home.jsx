import Banner from "../Banner/Banner";
import FeaturesSection from "../Features/FeaturesSection";
import HowWorks from "../HowWorks/HowWorks";
import SatisficationSection from "../Satisfication/SatisficationSection";
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
      <div className="px-2 sm:px-6 ">
        <SatisficationSection />
      </div>
    </div>
  );
}
export default Home;
