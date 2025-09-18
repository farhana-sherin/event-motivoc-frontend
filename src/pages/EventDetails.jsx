import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null); // should be null, not []
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { 
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`customer/events/detail/${id}/`);
        setEvent(response.data.data); // API response structure
      } catch (err) {
        console.error(err);
        setError("Failed to load event");
      } finally {
        setLoading(false); // stop loading in both success and error
      }
    };
    fetchEvent();
  }, [id]);

  return (
    <section className="w-full h-screen py-10 md:py-14">
      <div className="w-[95%] max-w-6xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-700">
            ← Back to home
          </Link>
        </div>

        {loading && (
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-2xl" />
            <div className="mt-6 h-8 w-2/3 bg-gray-200 rounded" />
            <div className="mt-3 h-4 w-1/2 bg-gray-200 rounded" />
            <div className="mt-6 h-24 bg-gray-200 rounded" />
          </div>
        )}

        {!loading && error && (
          <div className="p-6 rounded-xl bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {!loading && !error && event && (
          <article className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={event.images || event.image}
                  alt={event.title || "Event"}
                  className="w-full h-[360px] md:h-[460px] object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                {event.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                  {event.category || "EVENT"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                  {event.start_date || event.date || "TBA"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {event.price ? `${event.price}` : "Free"}
                </span>
              </div>
              <div className="mt-4 text-gray-700">
                📍 {event.location || event.venue || "Location TBA"}
              </div>
              <p className="mt-6 text-gray-600 leading-relaxed whitespace-pre-line">
                {event.description || event.short_description || "No description available."}
              </p>

              <div className="mt-8">
                <Link to={`/buy-ticket/${event.id}`}>
                <button className="w-full md:w-auto px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow">
                  Get Tickets
                </button>
                </Link>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default EventDetails;
