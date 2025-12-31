import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useWishlist } from "../context/WishlistContext";

const FeaturedEvents = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("customer/featured/event/");

        let items = [];
        if (Array.isArray(res.data)) {
          items = res.data;
        } else if (res.data && Array.isArray(res.data.data)) {
          items = res.data.data;
        } else if (res.data && Array.isArray(res.data.results)) {
          items = res.data.results;
        }

        setFeaturedEvents(items);
        setError(null);
      } catch (error) {
        console.error("Error fetching featured events:", error);
        if (error.response && error.response.status === 401) {
          // Silently fail or show empty for unauthorized on featured (or handle like recs)
          // Typically featured events might be public, but if API restricts:
          setError("UNAUTHORIZED");
        } else {
          setError("Failed to load featured events.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const formatEventDate = (dateString) => {
    if (!dateString) return 'Date TBA';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Date TBA' : date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return (
    <section className="w-full bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-20">
      <div className="w-[95%] max-w-7xl mx-auto text-center">
        <p className="text-gray-400 animate-pulse">Loading featured events...</p>
      </div>
    </section>
  );

  if (error === "UNAUTHORIZED") return null; // Or show login prompt if critical

  if (error) return (
    <section className="w-full bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-20">
      <div className="w-[95%] max-w-7xl mx-auto text-center">
        <p className="text-red-500">{error}</p>
      </div>
    </section>
  );

  // If no events
  if (featuredEvents.length === 0) return null;

  return (
    <section className="w-full bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-primary)] opacity-10 blur-[180px] pointer-events-none rounded-full"></div>

      <div className="w-[95%] max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="inline-block px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-[var(--color-primary)]/15 via-[var(--color-accent)]/15 to-[var(--color-secondary)]/15 border border-[var(--color-primary)]/30 text-[var(--color-text-secondary)] text-sm font-bold tracking-widest uppercase">
            Don't Miss Out
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hand-picked events that are trending right now. Secure your spot before they sell out.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredEvents.map((event, index) => {
            const isWishlisted = wishlist.includes(event.id);
            return (
              <div
                key={event.id}
                className="group relative flex flex-col h-full bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1220] rounded-[2.5rem] p-4 border-2 border-transparent hover:border-[var(--color-primary)] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-72 w-full rounded-[2rem] overflow-hidden mb-6">
                  <img
                    src={event.images || "https://placehold.co/600x600/151518/333?text=Featured"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-60"></div>

                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 bg-white text-black text-xs font-black uppercase px-3 py-1.5 rounded-lg">
                    Featured
                  </div>

                  {/* Date Tag */}
                  <div className="absolute bottom-4 left-4 bg-[var(--color-primary)]/90 backdrop-blur text-white text-xs font-bold uppercase px-3 py-1.5 rounded-lg shadow-lg">
                    {formatEventDate(event.start_date)}
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(event.id)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 backdrop-blur border border-white/10 hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300 group/heart"
                  >
                    {isWishlisted ? (
                      <HeartSolid className="w-5 h-5 text-[var(--color-primary)]" />
                    ) : (
                      <HeartOutline className="w-5 h-5 text-white group-hover/heart:text-[var(--color-primary)]" />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="px-2 pb-2 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-white line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                      {event.title}
                    </h3>
                    <span className="flex-shrink-0 text-white font-bold bg-[#1F1F23] px-3 py-1 rounded-lg border border-gray-700">
                      {event.price && parseFloat(event.price) > 0 ? `$${event.price}` : "Free"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                    <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="truncate">{event.location || event.venue || "Location TBA"}</span>
                  </div>

                  <div className="mt-auto">
                    <Link to={`/auth/event/detail/${event.id}`}>
                      <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] text-white font-bold uppercase tracking-wider text-xs border border-transparent hover:shadow-[0_15px_45px_-15px_rgba(124,58,237,0.6)] transition-all duration-300">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;