function FeatureCard({ imageSrc, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-md px-6 py-10  flex flex-col md:flex-row items-center gap-8 hover:shadow-lg transition duration-300">
      <img
        src={imageSrc}
        alt={title}
        className="w-40 md:w-48 object-contain border-r-2 border-gray-400 border-dashed pr-8"
      />
      <div className=" text-center md:text-left">
        <h3 className="text-xl font-bold text-teal-900 mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
