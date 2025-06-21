function Card({ icon, title, description }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6  hover:shadow-xl transition duration-300 hover:bg-primaryColor">
      <div className="mb-2 inline-block  ">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-teal-900 ">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

export default Card;
