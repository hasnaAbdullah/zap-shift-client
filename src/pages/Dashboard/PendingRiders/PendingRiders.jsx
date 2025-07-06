import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaTimesCircle, FaEye, FaTimes } from "react-icons/fa";

const PendingRiders = () => {
  const axiosInstance = useAxiosSecure();

  const {
    data: pendingRiders = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/riders/pending?status=pending");
      return res.data;
    },
  });

  const [selectedRider, setSelectedRider] = useState(null);

  const handleAction = async (riderId, action) => {
    const confirmResult = await Swal.fire({
      title: `Are you sure you want to ${action} this rider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: action === "approve" ? "Yes, approve" : "Yes, reject",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await axiosInstance.patch(`/riders/${riderId}/status`, {
        status: action === "approve" ? "approved" : "rejected",
      });

      Swal.fire("Success", `Rider ${action}d successfully!`, "success");
      refetch();
      setSelectedRider(null); // close modal if open
    } catch (error) {
      console.error(`Failed to ${action} rider:`, error);
      Swal.fire("Error", `Failed to ${action} rider.`, "error");
    }
  };

  if (isPending) return <Loader />;

  if (pendingRiders.length === 0)
    return <p className="p-4 text-center">No pending riders found.</p>;

  return (
    <div className="p-4 max-w-8xl my-16 mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
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
            <th className="border border-gray-300 px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingRiders.map((rider) => (
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
              <td className="border border-gray-300 px-3 py-2 space-x-1 flex items-center">
                <button
                  onClick={() => setSelectedRider(rider)}
                  className="border-2 border-blue-600 text-blue-600 px-2 py-1 rounded cursor-pointer"
                  title="View Details"
                >
                  <FaEye size={18} />
                </button>

                <button
                  onClick={() => handleAction(rider._id, "approve")}
                  className="border-2 border-green-600 text-green-600 px-2 py-1 rounded cursor-pointer"
                  title="Approve"
                >
                  <FaCheckCircle size={20} />
                </button>

                <button
                  onClick={() => handleAction(rider._id, "reject")}
                  className="border-2 border-red-600 text-red-600 px-2 py-1 rounded cursor-pointer"
                  title="Reject"
                >
                  <FaTimesCircle size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
          <div className="bg-white rounded shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedRider(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Rider Details</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRider.phone}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>Covered Area:</strong> {selectedRider.covered_area}
              </p>
              <p>
                <strong>Bike Brand:</strong> {selectedRider.bike_brand}
              </p>
              <p>
                <strong>Bike Registration Number:</strong>{" "}
                {selectedRider.bike_reg_number}
              </p>
              <p>
                <strong>National ID:</strong> {selectedRider.nid}
              </p>
              {/* Add more fields if needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
