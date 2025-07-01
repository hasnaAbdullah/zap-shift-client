import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <button
        disabled
        className="flex items-center gap-2 px-6 py-3 bg-[#CAEB66] text-black font-semibold rounded-xl shadow-md cursor-not-allowed"
      >
        <FaSpinner className="animate-spin text-xl" />
        Loading...
      </button>
    </div>
  );
};

export default Loader;
