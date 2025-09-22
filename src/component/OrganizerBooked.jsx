import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      <div className="flex items-center justify-center h-screen text-white">
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
      <div className="flex items-center justify-center h-screen text-white">
        No booking found
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0c1030]  px-4">
      <div className="w-full max-w-3xl p-8 bg-gray-900 rounded-xl shadow-xl text-white">
        <h2 className="text-4xl font-bold mb-6 text-center">{booking.event_title}</h2>
        <div className="space-y-4 text-lg">
          <p>
            <span className="font-semibold">Customer:</span> {booking.customer_name || "N/A"} ({booking.customer_email})
          </p>
          <p>
            <span className="font-semibold">Tickets:</span> {booking.tickets_count}
          </p>
          <p>
            <span className="font-semibold">Booking Date:</span>{" "}
            {new Date(booking.booking_date).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Payment Status:</span>{" "}
            <span
              className={
                booking.payment_status === "SUCCESS"
                  ? "text-green-400"
                  : booking.payment_status === "REFUNDED"
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            >
              {booking.payment_status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Amount Paid:</span> ₹{booking.amount_paid}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizerBooked;
