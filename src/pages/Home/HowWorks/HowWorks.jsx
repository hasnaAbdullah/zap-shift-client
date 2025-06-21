import { FaBoxes, FaCogs, FaTruckMoving, FaChartLine } from "react-icons/fa";
import Card from "./Card";

const howItWorksData = [
  {
    icon: <FaBoxes className="text-4xl text-teal-900" />,
    title: "Organize Parcels",
    description:
      "Easily categorize and store parcel data with robust database structuring.",
  },
  {
    icon: <FaCogs className="text-4xl text-teal-900" />,
    title: "Automate Processes",
    description: "Use smart automation tools to streamline delivery workflows.",
  },
  {
    icon: <FaTruckMoving className="text-4xl text-teal-900" />,
    title: "Track in Real-Time",
    description: "Monitor parcel movements with real-time tracking systems.",
  },
  {
    icon: <FaChartLine className="text-4xl text-teal-900" />,
    title: "Analyze Performance",
    description: "Gain insights through detailed reports and analytics.",
  },
];

function HowWorks() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-left mb-10 text-gray-800">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksData.map((item, index) => (
            <Card
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowWorks;
