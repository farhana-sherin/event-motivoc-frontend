import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

export const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`customer/events/detail/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(response.data.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading event details...</div>;
  if (!event) return <div className="p-6 text-center text-red-500">{error || "Event not found"}</div>;

  return (
    <section className="w-full min-h-screen flex items-start py-10 md:py-14 bg-gray-50">
      <div className="w-[95%] max-w-4xl mx-auto">
        <Link to={`/`} className="text-sm text-indigo-600 hover:text-indigo-700">
          ← Back to events
        </Link>

        <div className="mt-6 rounded-2xl shadow-md bg-white overflow-hidden">
          {/* Event Image */}
          {event.images ? (
            <div className="h-64 md:h-80 w-full">
              <img
                src={event.images}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-64 md:h-80 w-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Image Available
            </div>
          )}

          <div className="p-6">
            <h1 className="text-3xl font-extrabold mb-4">{event.title}</h1>

            <div className="text-gray-700 mb-4">
              📍 {event.location || event.venue || "Location TBA"} | 🗓 {event.start_date || "TBA"}
            </div>

            {event.short_description && (
              <div className="mb-4 text-gray-700 font-medium">{event.short_description}</div>
            )}

            {event.description && (
              <div className="mb-6 text-gray-800 whitespace-pre-line">{event.description}</div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <span className="text-lg font-semibold">Price:</span>
              <span className="min-w-[80px] text-center text-lg font-semibold bg-gray-100 rounded-full px-4 py-1 shadow-inner">
                {event.price || "Free"}
              </span>
            </div>
              

            <Link to={`/bookings/new?event=${event.id}`} className="  w-full px-3 py-3 rounded-2xl text-white font-bold text-lg tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
            Buy Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
