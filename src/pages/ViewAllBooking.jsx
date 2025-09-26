import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const ViewAllBooking = () => {
  const [latestBookings, setLatestBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("latest"); // latest or past
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("customer/view/all/booking", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Bookings API response:", res.data);

        setLatestBookings(res.data.data.latest_bookings || []);
        setPastBookings(res.data.data.past_bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading your bookings...
        </p>
      </div>
    );
  }

  const bookingsToShow = activeTab === "latest" ? latestBookings : pastBookings;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          My{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bookings
          </span>
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("latest")}
            className={`px-6 py-2 rounded-full font-medium ${
              activeTab === "latest"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-2 rounded-full font-medium ${
              activeTab === "past"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Past
          </button>
        </div>

        {bookingsToShow.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-600 text-lg">
              {activeTab === "latest"
                ? "No upcoming bookings yet."
                : "No past bookings."}
            </p>
            {activeTab === "latest" && (
              <Link
                to="/events"
                className="mt-4 inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:opacity-90"
              >
                Browse Events
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bookingsToShow.map((booking) => {
              const event = booking.event;
              const startDate = new Date(event.start_date);

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={event.images || "/placeholder.jpg"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-xl shadow">
                      {startDate.toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      📍 {event.location || "Location TBA"}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      🎟️ Tickets: {booking.tickets_count}
                    </p>

                    <div className="flex items-center justify-between">
                      <Link
                        to={`/booking/${booking.id}`}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        View Booking →
                      </Link>

                      {activeTab === "past" && booking.can_review && (
                        <button
                          onClick={() =>
                            navigate(`/event/${event.id}/reviews`)
                          }
                          className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
                        >
                          Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllBooking;
