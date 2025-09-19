import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const BookingDetailsPage = () => {
  const { bookingId } = useParams(); // Ensure route uses :bookingId
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get(
          `/customer/bookings/detail/${bookingId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBooking(response.data.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId, token]);

  const handlePayment = async () => {
    try {
      const response = await axiosInstance.post(
        `/payment/payments/create-checkout-session/${bookingId}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data?.url) {
        window.location.href = response.data.url; // Redirect to Stripe
      } else {
        alert("Stripe session URL not received.");
      }
    } catch (err) {
      console.error("Payment failed:", err.response ? err.response.data : err);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading booking...</div>;
  if (!booking) return <div className="p-6 text-center text-red-500">Booking not found</div>;

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-16">
      <div className="w-[95%] max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Details</h1>
        <p><strong>Event:</strong> {booking.event}</p>
        <p><strong>Tickets:</strong> {booking.tickets}</p>
        <p><strong>Booking Date:</strong> {booking.booking_date}</p>
        <p><strong>Total Price:</strong> ₹{booking.total_price}</p>
        <p><strong>Status:</strong> {booking.payment_status}</p>

        {booking.payment_status === "PENDING" && (
          <button
            onClick={handlePayment}
            className="mt-6 w-full px-6 py-4 rounded-2xl text-white font-bold text-lg tracking-wide 
            bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
          >
            Proceed to Payment
          </button>
        )}
      </div>
    </section>
  );
};

export default BookingDetailsPage;
