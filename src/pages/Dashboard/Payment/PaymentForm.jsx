import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader/Loader";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(parcelId);

  const { data: parcel, isPending } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) return <Loader />;
  console.log(parcel);

  const amountInCents = parcel.deliveryCost * 100;
  console.log(amountInCents);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    //step 2: payment intend
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId,
    });

    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment Succeeded!!");
        //after successful payment, create the payment history
        const paymentDetails = {
          parcelId,
          user_email: user.email,
          amount: parcel.deliveryCost,
          transactionId: result.paymentIntent.id,
          paymentMehtod: result.paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post(
          "/parcels/payment",
          paymentDetails
        );

        if (paymentRes.data.insertedId) {
          console.log("your payment is successfull");
          Swal.fire({
            title: "Payment Successful!",
            html: `
        <p><strong>Transaction ID:</strong> ${result.paymentIntent.id}</p>
        <p><strong>Payment Method:</strong> ${result.paymentIntent.payment_method_types}</p>
      `,
            icon: "success",
            confirmButtonText: "Go to My Parcels",
            confirmButtonColor: "#CAEB66",
          }).then(() => {
            navigate("/dashboard/my-parcels"); // or your actual route
          });
        }
        console.log("payment responsed", paymentRes);
      }
    }
    console.log("res from intent", res);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Payment Details
        </h2>

        <div className="p-4 border rounded-lg bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="w-full py-2 rounded-lg bg-primaryColor text-teal-900 hover:bg-green-300 font-semibold transition duration-200"
        >
          pay ${parcel.deliveryCost}
        </button>
      </form>
    </div>
  );
}
export default PaymentForm;
