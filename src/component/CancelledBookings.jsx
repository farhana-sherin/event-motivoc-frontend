import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import OrganizerLayout from "./OrganizerLayout";

const CancelledBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchCancelledBookings = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get("organizer/cancelled/bookings/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.status_code === 6000) {
        setBookings(res.data.data);
      } else {
        setMessage("Failed to fetch cancelled bookings.");
      }
    } catch (err) {
      console.error("Error fetching cancelled bookings:", err);
      setMessage("Failed to fetch cancelled bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCancelledBookings();
  }, []);

  const content = () => {
    if (loading) {
      return (
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-gray-600 font-medium">Loading cancelled bookings...</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cancelled Bookings</h1>
          <p className="text-gray-600">View and manage cancelled event bookings.</p>
        </div>

        {message && (
          <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {message}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">No cancelled bookings found.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{booking.event_title}</h3>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm"><span className="font-medium">Customer:</span> {booking.customer_name}</p>
                  <p className="text-gray-600 text-sm"><span className="font-medium">Booking Date:</span> {new Date(booking.booking_date).toLocaleDateString()}</p>
                  <p className="text-gray-600 text-sm"><span className="font-medium">Cancelled Date:</span> {new Date(booking.cancelled_date).toLocaleDateString()}</p>
                  <p className="text-gray-600 text-sm"><span className="font-medium">Refund Amount:</span> <span className="font-semibold text-red-600">₹{booking.refund_amount}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <OrganizerLayout>
      {content()}
    </OrganizerLayout>
  );
};

export default CancelledBookings;
