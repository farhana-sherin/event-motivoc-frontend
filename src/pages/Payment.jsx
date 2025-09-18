import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ bookingId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axiosInstance.post(`payment/payment/create/${bookingId}/`);
      const { client_secret } = res.data.data;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await axiosInstance.post(`payment/payment/confirmed/${bookingId}/`);
        setSuccess("Payment successful!");
        setTimeout(() => navigate("/my-bookings"), 2000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Payment failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
      <p className="mb-4 text-gray-700">Amount: ₹{amount}</p>
      <div className="mb-4 border p-3 rounded">
        <CardElement />
      </div>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export const Payment = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // Use the correct endpoint for booking details
        const res = await axiosInstance.get(`customer/bookings/detail/${id}/`);
        setBooking(res.data.data);

        const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
        setStripePromise(loadStripe(pk));
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooking();
  }, [id]);

  if (!booking)
    return <div className="p-6 text-center">Loading booking...</div>;

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[95%] max-w-lg mx-auto">
        {stripePromise && (
          <Elements stripe={stripePromise}>
            <PaymentForm bookingId={id} amount={booking.total_amount} />
          </Elements>
        )}
      </div>
    </section>
  );
};

export default Payment;
