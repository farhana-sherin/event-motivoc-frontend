import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const OrganizerBooked = () => {
  const { id } = useParams(); 
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        `organizer/booking/detail/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status_code === 6000) {
        setBooking(response.data.data);
      } else {
        setError(response.data.message || "Booking not found");
      }
    } catch (err) {
      console.error("Error fetching booking:", err);
      setError("Failed to fetch booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBooking();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading booking...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  if (!booking)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        No booking found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg border">
        {/* Header */}
        <div className="px-6 py-5 border-b bg-indigo-50 rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-800">
            {booking.event_title}
          </h2>
          <p className="text-sm text-gray-500">
            Booking ID: {booking.booking_id}
          </p>
        </div>

        {/* Details */}
        <div className="px-6 py-6 space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold">👤 Customer:</span>{" "}
            {booking.customer_name || "N/A"} ({booking.customer_email})
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">🎟 Tickets:</span>{" "}
            {booking.tickets_count}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">📅 Booking Date:</span>{" "}
            {new Date(booking.booking_date).toLocaleString()}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">💰 Amount Paid:</span> ₹
            {booking.amount_paid}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">✅ Payment Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                booking.payment_status === "SUCCESS"
                  ? "bg-green-100 text-green-700"
                  : booking.payment_status === "REFUNDED"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {booking.payment_status}
            </span>
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
          <Link
            to="/auth/organizer/bookings"
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
          >
            Back to Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrganizerBooked;
