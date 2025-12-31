import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useWishlist } from "../context/WishlistContext";

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageSize = 3;

  const { wishlist, toggleWishlist } = useWishlist();

  // Fetch upcoming events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Attempting to fetch upcoming events...");

        // First try the dedicated upcoming events endpoint
        try {
          const res = await axiosInstance.get("customer/upcoming/event/");
          console.log("API Response for upcoming events:", res);

          // Even if the response is successful, if there are no events, try to get all events
          if (res.data && Array.isArray(res.data)) {
            if (res.data.length === 0) {
              console.log("No upcoming events found, trying to fetch all events...");
              throw new Error("No upcoming events");
            }
            setUpcomingEvents(res.data);
            return;
          } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
            if (res.data.data.length === 0) {
              console.log("No upcoming events found in data, trying to fetch all events...");
              throw new Error("No upcoming events");
            }
            setUpcomingEvents(res.data.data);
            return;
          }
        } catch (endpointError) {
          console.log("Failed to fetch from upcoming events endpoint or no events found, trying general events list");
        }

        // If upcoming events endpoint fails or returns no events, try the general events list
        try {
          const res = await axiosInstance.get("customer/events/list/");
          console.log("API Response for all events:", res);

          // Handle different response formats
          let allEvents = [];
          if (res.data && Array.isArray(res.data)) {
            allEvents = res.data;
          } else if (res.data && res.data.data) {
            if (Array.isArray(res.data.data)) {
              allEvents = res.data.data;
            } else if (Array.isArray(res.data.data.events)) {
              allEvents = res.data.data.events;
            }
          }

          console.log("All events fetched:", allEvents.length);

          // Filter for upcoming events (future dates)
          const now = new Date();
          const filteredEvents = allEvents.filter(event => {
            const eventDate = new Date(event.start_date || event.date);
            return eventDate >= now;
          });

          console.log("Filtered upcoming events:", filteredEvents.length);

          // Sort by date (soonest first)
          const sortedEvents = filteredEvents.sort((a, b) => {
            const dateA = new Date(a.start_date || a.date);
            const dateB = new Date(b.start_date || b.date);
            return dateA - dateB;
          });

          setUpcomingEvents(sortedEvents);
        } catch (generalError) {
          console.error("Failed to fetch from general events endpoint:", generalError);
          throw new Error("Failed to fetch events from any endpoint");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        console.error("Error response:", error.response);
        setError("Failed to load upcoming events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Use robust date formatting
  const formatEventDate = (dateString) => {
    if (!dateString) return 'Date TBA';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Date TBA' : date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Pagination Logic
  const visibleEvents = upcomingEvents.slice(currentIndex, currentIndex + pageSize);
  const handleNext = () => {
    if (currentIndex + pageSize < upcomingEvents.length) setCurrentIndex(currentIndex + pageSize);
  };
  const handlePrev = () => {
    if (currentIndex - pageSize >= 0) setCurrentIndex(currentIndex - pageSize);
  };

  if (loading) return (
    <section className="w-full bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-12">
      <div className="w-[95%] max-w-7xl mx-auto text-center">
        <p className="text-gray-400 animate-pulse">Loading events...</p>
      </div>
    </section>
  );

  if (error) return (
    <section className="w-full bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-12">
      <div className="w-[95%] max-w-7xl mx-auto text-center">
        <p className="text-red-500">{error}</p>
        <p className="text-gray-500 mt-2">Please try refreshing the page.</p>
      </div>
    </section>
  );

  return (
    <section className="w-full bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-12 relative">
      <div className="w-[95%] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Events</span>
            </h2>
            <div className="h-1 w-20 bg-[var(--color-primary)] rounded-full"></div>
          </div>

          {/* Navigation Buttons */}
          {upcomingEvents.length > pageSize && (
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="w-12 h-12 rounded-full border border-gray-700 text-white flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gray-700 transition-all duration-300"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex + pageSize >= upcomingEvents.length}
                className="w-12 h-12 rounded-full border border-gray-700 text-white flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gray-700 transition-all duration-300"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1220] rounded-3xl border border-gray-800 shadow-[0_20px_60px_-25px_rgba(124,58,237,0.35)]">
            <div className="mx-auto w-24 h-24 bg-[#111827] rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl">No upcoming events found.</p>
            <p className="text-gray-600 mt-2">Check back later for new experiences!</p>
            <Link to="/auth/event/list" className="mt-6 inline-block px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-secondary)] transition-colors">
              Browse All Events
            </Link>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleEvents.map((event) => {
              const isWishlisted = wishlist.includes(event.id || event._id);
              return (
                <div
                  key={event.id || event._id || Math.random()} // Fallback for missing IDs
                  className="group relative bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1220] rounded-3xl overflow-hidden border-2 border-transparent hover:border-[var(--color-primary)] transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={event.images || event.image || "https://placehold.co/600x400/151518/333?text=No+Image"}
                      alt={event.title || "Event Image"}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/600x400/151518/333?text=No+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-[#0c1020]/70 to-transparent opacity-90" />

                    {/* Price Tag */}
                    <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
                      {event.price && parseFloat(event.price) > 0 ? `₹${event.price}` : "Free"}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(event.id || event._id)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300 group/heart"
                    >
                      {isWishlisted ? (
                        <HeartSolid className="w-5 h-5 text-[var(--color-primary)] group-hover/heart:text-white" />
                      ) : (
                        <HeartOutline className="w-5 h-5 text-white" />
                      )}
                    </button>

                    {/* Date Badge (Bottom Left overlay) */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                        {formatEventDate(event.start_date || event.date)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-2 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                      {event.title || "Untitled Event"}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="truncate">{event.location || event.venue || event.address || "Location TBA"}</span>
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-grow">
                      {event.description || event.short_description || "Join us for this amazing event."}
                    </p>

                    <Link to={`/auth/event/detail/${event.id || event._id || "#"}`}>
                      <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] text-white font-bold uppercase tracking-wider text-sm hover:shadow-[0_15px_45px_-15px_rgba(124,58,237,0.6)] transition-all duration-300">
                        Get Ticket
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;