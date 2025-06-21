function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white/95 shadow-md shadow-primaryColor/20 hover:bg-primaryColor rounded-2xl py-14 p-6 lg:px-10 hover:shadow-xl transition duration-300">
      <span className="mb-2 inline-block text-teal-900 text-4xl">{icon}</span>
      <h3 className="text-xl font-semibold mb-2 text-teal-950">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default ServiceCard;
