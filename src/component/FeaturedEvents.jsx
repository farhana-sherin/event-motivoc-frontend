import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

export const FeaturedEvents = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axiosInstance.get("customer/featured/event/");
        const payload = response?.data;
        const items = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.results)
            ? payload.results
            : Array.isArray(payload)
              ? payload
              : [];
        setFeaturedEvents(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="w-[95%] max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-600 text-white text-xs font-bold mb-5 shadow">
            <span>FEATURED EVENTS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            Discover Amazing Events
          </h2>
        </div>

        {/* Grid of cards */}
        {featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredEvents.map((event) => (
              <article key={event.id}>
                <Link
                  to={`/events/${event.id || event._id || event.slug || ""}`}
                  className="block rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <div className="relative h-56 md:h-64 lg:h-64">
                    <img
                      src={event.images}
                      alt={event.title || "Event image"}
                      className="h-full w-full object-cover"
                    />
                    {/* Price badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow">
                      {event.price ? `${event.price}` : "Free"}
                    </div>
                  </div>

                  <div className="px-5 md:px-6 py-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700">
                        {event.category || "CONFERENCE"}
                      </span>
                      <span className="text-xs font-semibold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-full">
                        {event.start_date || "TBA"}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2 leading-snug line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-gray-500">
                      <span className="text-sm">
                        📍 {event.location || event.venue || "Location TBA"}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-4xl">🎪</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Featured Events Yet</h3>
            <p className="text-gray-600 text-lg">Check back soon for amazing events</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;
