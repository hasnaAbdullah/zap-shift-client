import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader/Loader";

function PaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isPending } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) return <Loader />;

  return (
    <div className="px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Payment History
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Review all your completed payments and transactions.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th>Parcel ID</th>
              <th>Email</th>
              <th>Transaction ID</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="text-black dark:text-white">
                <td className="py-6">{payment.parcelId}</td>
                <td className="py-6">{payment.user_email}</td>
                <td>{payment.transactionId}</td>
                <td>
                  {Array.isArray(payment.paymentMehtod)
                    ? payment.paymentMehtod.join(", ")
                    : payment.paymentMehtod}
                </td>
                <td>৳{payment.amount}</td>
                <td>
                  {new Date(payment.paid_at).toLocaleString("en-BD", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentHistory;
