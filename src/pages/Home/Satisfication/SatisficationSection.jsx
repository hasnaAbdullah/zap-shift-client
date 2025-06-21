import beMarchant from "../../../assets/be-a-merchant-bg.png";
import location from "../../../assets/location-merchant.png";

function SatisficationSection() {
  return (
    <section
      className="bg-teal-950 py-16 px-6  bg-no-repeat xl:p-20  rounded-2xl max-w-7xl mx-auto "
      style={{ backgroundImage: `url(${beMarchant})` }}
    >
      <div
        className={` flex flex-col-reverse lg:flex-row items-center gap-10  `}
      >
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-white mb-4">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-gray-300 mb-6">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-[#caeb66] text-gray-800 font-semibold py-2 px-6 rounded-full hover:brightness-110 transition">
              Become a Merchant
            </button>
            <button className="border border-[#caeb66] text-[#caeb66] font-semibold py-2 px-6 rounded-full hover:bg-[#caeb66] hover:text-gray-900 transition">
              Earn With Profast Courier
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2">
          <img
            src={location}
            alt="location marchant"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default SatisficationSection;
