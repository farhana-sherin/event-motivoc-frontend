import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get(
          `customer/booking/detail/${bookingId}/`,
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

  const handleCancelBooking = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
  
    setCancelling(true);
    try {
      const response = await axiosInstance.post(
        `customer/booking/cancel/${bookingId}/`,
        { refund_amount: booking.amount_paid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
  
      // Update booking with refunded amount
      setBooking(prev => ({
        ...prev,
        payment_status: "REFUNDED",
        refund_amount: response.data.refund_amount
      }));
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert(err.response?.data?.error || "Failed to cancel booking");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading booking...</div>;
  if (!booking) return <div className="p-6 text-center text-red-500">Booking not found</div>;

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-16">
      <div className="w-[95%] max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Details</h1>
        
        <p><strong>Event:</strong> {booking.event.title}</p>
        <p><strong>Tickets:</strong> {booking.tickets_count}</p>
        <p><strong>Booking Date:</strong> {booking.booking_date}</p>
        <p><strong>Total Price:</strong> ₹{booking.event.price * booking.tickets_count}</p>
        <p><strong>Amount Paid:</strong> ₹{booking.amount_paid}</p>
        <p><strong>Status:</strong> {booking.payment_status}</p>
        <p><strong>QR Code Text:</strong> {booking.qr_code_text}</p>

        {/* Cancel Button */}
        {booking.payment_status === "SUCCESS" && (
          <button
            onClick={handleCancelBooking}

            disabled={cancelling}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            {cancelling ? "Cancelling..." : "Cancel Booking"}
          </button>
        )}
      </div>
      
    </section>
    
  );
};

export default BookingDetailsPage;
