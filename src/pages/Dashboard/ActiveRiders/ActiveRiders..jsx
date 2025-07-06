import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader/Loader";
import { useQuery } from "@tanstack/react-query";

const ActiveRiders = () => {
  const axiosInstance = useAxiosSecure();

  const {
    data: activeRiders = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/riders/active?status=active");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  if (activeRiders.length === 0)
    return <p className="p-4 text-center">No active riders found.</p>;

  return (
    <div className="p-4 max-w-8xl my-16 mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2">Name</th>
            <th className="border border-gray-300 px-3 py-2">Email</th>
            <th className="border border-gray-300 px-3 py-2">Phone</th>
            <th className="border border-gray-300 px-3 py-2">Region</th>
            <th className="border border-gray-300 px-3 py-2">Covered Area</th>
            <th className="border border-gray-300 px-3 py-2">Bike Brand</th>
            <th className="border border-gray-300 px-3 py-2">Bike Reg. No.</th>
          </tr>
        </thead>
        <tbody>
          {activeRiders.map((rider) => (
            <tr key={rider._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2">{rider.name}</td>
              <td className="border border-gray-300 px-3 py-2">
                {rider.email}
              </td>
              <td className="border border-gray-300 px-3 py-2">
                {rider.phone}
              </td>
              <td className="border border-gray-300 px-3 py-2">
                {rider.region}
              </td>
              <td className="border border-gray-300 px-3 py-2">
                {rider.covered_area}
              </td>
              <td className="border border-gray-300 px-3 py-2">
                {rider.bike_brand}
              </td>
              <td className="border border-gray-300 px-3 py-2">
                {rider.bike_reg_number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveRiders;
