import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useWishlist } from "../context/WishlistContext";

const RecommendedEvents = () => {
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageSize = 3;

  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchRecommendedEvents = async () => {
      try {
        setLoading(true);
        // FIXED: Updated URL to match backend (plural 'recommendations')
        const response = await axiosInstance.get("/customer/recommendations/");
        console.log("API Response:", response.data);

        let events = [];
        if (Array.isArray(response.data)) {
          events = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          events = response.data.data;
        } else if (response.data && Array.isArray(response.data.results)) {
          events = response.data.results;
        }

        setRecommendedEvents(events);
        setError(null);
      } catch (error) {
        console.error("Error fetching recommendations:", error);

        // Handle 401 Unauthorized specially
        if (error.response && error.response.status === 401) {
          setError("UNAUTHORIZED"); // Special flag for render
        } else if (error.response && error.response.status === 404) {
          setError("Recommendation service unavailable.");
        } else {
          setError("Failed to load recommended events.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedEvents();
  }, []);

  // Reuse date formatting logic
  const formatEventDate = (dateString) => {
    if (!dateString) return 'Date TBA';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Date TBA' : date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleNext = () => {
    if (currentIndex + pageSize < recommendedEvents.length) {
      setCurrentIndex(currentIndex + pageSize);
    }
  };

  const handlePrev = () => {
    if (currentIndex - pageSize >= 0) {
      setCurrentIndex(currentIndex - pageSize);
    }
  };

  const visibleEvents = recommendedEvents.slice(currentIndex, currentIndex + pageSize);

  if (loading) return (
    <section className="w-full bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-12">
      <div className="w-[95%] max-w-7xl mx-auto text-center">
        <p className="text-gray-400 animate-pulse">Loading recommendations...</p>
      </div>
    </section>
  );

  // Special State for Login Required
  if (error === "UNAUTHORIZED") return (
    <section className="w-full bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-12">
      <div className="w-[95%] max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
          Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Events</span>
        </h2>
        <p className="text-gray-400 mt-4 mb-6">Sign in to discover events tailored just for you.</p>
        <Link to="/login">
          <button className="px-8 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-all duration-300 shadow-lg">
            Login Now
          </button>
        </Link>
      </div>
    </section>
  );

  // Generic Error State
  if (error) return (
    <section className="w-full bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-12">
      <div className="w-[95%] max-w-7xl mx-auto text-center">
        <p className="text-red-500">{error}</p>
      </div>
    </section>
  );

  // Empty State
  if (recommendedEvents.length === 0) return (
    <section className="w-full bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-12">
      <div className="w-[95%] max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
          Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Events</span>
        </h2>
        <p className="text-gray-500 mt-8">No recommendations found for you yet.</p>
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
              Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Events</span>
            </h2>
            <div className="h-1 w-20 bg-[var(--color-primary)] rounded-full"></div>
            <p className="mt-4 text-gray-400">Curated just for you</p>
          </div>

          {/* Navigation Buttons */}
          {recommendedEvents.length > pageSize && (
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
                disabled={currentIndex + pageSize >= recommendedEvents.length}
                className="w-12 h-12 rounded-full border border-gray-700 text-white flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gray-700 transition-all duration-300"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleEvents.map((event) => {
            const isWishlisted = wishlist.includes(event.id);
            return (
              <div
                key={event.id}
                className="group relative bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1220] rounded-3xl overflow-hidden border-2 border-transparent hover:border-[var(--color-primary)] transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={event.images || "https://placehold.co/600x400/151518/333?text=No+Image"}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-[#0c1020]/70 to-transparent opacity-90" />

                  {/* Price Tag */}
                  <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
                    {event.price && parseFloat(event.price) > 0 ? `$${event.price}` : "Free"}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(event.id)}
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
                      {formatEventDate(event.start_date)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                    {event.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="truncate">{event.location || event.venue || "Location TBA"}</span>
                  </div>

                  <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-grow">
                    {event.description || "Join us for this amazing event."}
                  </p>

                  <Link to={`/auth/event/detail/${event.id}`}>
                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] text-white font-bold uppercase tracking-wider text-sm hover:shadow-[0_15px_45px_-15px_rgba(124,58,237,0.6)] transition-all duration-300">
                      Get Ticket
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecommendedEvents;