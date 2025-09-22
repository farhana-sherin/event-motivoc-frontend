import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import { Link } from "react-router-dom";

const OrganizerBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); // show first 6 by default

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("organizer/event/booking/all/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status_code === 6000) {
        const sortedBookings = response.data.data.sort(
          (a, b) =>
            new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
        );
        setBookings(sortedBookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading)
    return <div className="text-white text-center mt-10">Loading bookings...</div>;

  if (!bookings.length)
    return (
      <div className="text-white text-center mt-10">
        No bookings have been made for your events yet.
      </div>
    );

  return (
    <div className="w-[95%] max-w-7xl mx-auto py-10">
      <h2 className="text-3xl text-white font-bold mb-8">Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.slice(0, visibleCount).map((booking) => (
          <div
            key={booking.booking_id}
            className="bg-[#0c1030] rounded-xl overflow-hidden shadow-lg border-b border-indigo-900/40 transition-all duration-300 hover:shadow-xl"
          >
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
              <h3 className="text-white text-lg font-semibold">
                {booking.event_title}
              </h3>
            </div>

            <div className="p-5">
              <p className="text-gray-300 text-sm mb-1">
                Customer: {booking.customer_name} ({booking.customer_email})
              </p>
              <p className="text-gray-300 text-sm mb-1">
                Tickets: {booking.tickets_count}
              </p>
              <p className="text-gray-300 text-sm mb-1">
                Booking Date: {new Date(booking.booking_date).toLocaleDateString()}
              </p>
              <p
                className={`text-sm font-medium mb-2 ${
                  booking.payment_status === "SUCCESS"
                    ? "text-green-400"
                    : booking.payment_status === "REFUNDED"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                Payment Status: {booking.payment_status}
              </p>
              <p className="text-gray-300 text-sm mb-2">
                Amount Paid: ₹{booking.amount_paid}
              </p>
              <Link
                to={`/Organizerbooking/details/${booking.booking_id}`}
                className="inline-block mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                View Event
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View More / View Less Buttons */}
      <div className="flex justify-center mt-8">
        {visibleCount < bookings.length ? (
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)} // load 6 more
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
          >
            View More
          </button>
        ) : bookings.length > 6 ? (
          <button
            onClick={() => setVisibleCount(6)} // reset back to 6
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded hover:from-purple-700 hover:to-indigo-700 transition shadow-lg"
          >
            View Less
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default OrganizerBooking;
