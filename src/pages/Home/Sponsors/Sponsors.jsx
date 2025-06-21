import amazon from "../../../assets/brands/amazon.png";
import moonstar from "../../../assets/brands/moonstar.png";
import casio from "../../../assets/brands/casio.png";
import star from "../../../assets/brands/start.png";
import startPeople from "../../../assets/brands/start-people1.png";
import randstad from "../../../assets/brands/randstad.png";

function SponsorsSection() {
  const sponsorLogos = [casio, amazon, moonstar, star, startPeople, randstad];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Our Sponsors
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {sponsorLogos.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Sponsor ${index + 1}`}
              className="max-h-16 object-contain  transition duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SponsorsSection;
