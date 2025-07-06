import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../shared/Loader/Loader";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FcCurrencyExchange } from "react-icons/fc";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function MyParcels() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // Queries
  const {
    isLoading,
    data: parcels = [],
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/user?email=${user.email}`);
      return res.data;
    },
  });

  console.log(user.email);
  if (isLoading) return <Loader />;
  console.log(parcels);

  const handleView = (parcel) => {
    console.log(parcel);
  };

  const handleEdit = (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to edit this parcel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(parcel);
      }
    });
  };

  const handleDelete = async (parcelId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        axiosSecure
          .delete(`/parcels/${parcelId}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire("Deleted!", "The parcel has been deleted.", "success");
            }
            // Update UI by removing deleted parcel
            refetch();
          })
          .catch(() => {
            Swal.fire("Failed", "Could not delete the parcel.", "error");
          });
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  const handlePayment = (id) => {
    console.log(id);
    navigate(`/dashboard/payment/${id}`);
  };
  return (
    <div className="px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Your Parcels
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage all of your sent parcels in one place.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="py-6">Sender</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="text-black dark:text-white py-7">
                  {parcel.sender.name}
                </td>
                <td className="text-black dark:text-white">
                  {parcel.receiver.name}
                </td>
                <td className="text-black dark:text-white">
                  ৳{parcel.deliveryCost}
                </td>
                <td className="text-black dark:text-white">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td>
                  <span className="capitalize text-black dark:text-white">
                    {parcel.parcelType}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleView(parcel)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className={`btn btn-sm btn-outline flex items-center gap-1 ${
                      parcel.payment_status === "paid"
                        ? "cursor-not-allowed"
                        : ""
                    } `}
                    onClick={() => handlePayment(parcel._id)}
                    disabled={parcel.payment_status === "paid" ? true : false}
                  >
                    <FcCurrencyExchange /> pay
                  </button>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleEdit(parcel)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDelete(parcel._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default MyParcels;
