import Footer from "../../shared/Footer/Footer";
import Banner from "../Banner/Banner";
import FAQS from "../FAQS/FAQS";
import FeaturesSection from "../Features/FeaturesSection";
import HowWorks from "../HowWorks/HowWorks";
import SatisficationSection from "../Satisfication/SatisficationSection";
import Services from "../Services/Services";
import SponsorsSection from "../Sponsors/Sponsors";
import Timeline from "../TimeLineContent/Timeline.";

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
      <Timeline />
      <FAQS />
      <Footer />
    </div>
  );
}
export default Home;
