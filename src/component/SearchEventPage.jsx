import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useWishlist } from "../context/WishlistContext";

const SearchEventsPage = () => {
  const { category } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post(
          "customer/searchby/category/",
          { category: category }
        );
        setEvents(response.data.data || []);
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  // Format Helper
  const formatEventDate = (dateString) => {
    if (!dateString) return 'Date TBA';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Date TBA' : date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B0B0C]">
        <p className="text-xl font-medium text-gray-500 animate-pulse tracking-widest uppercase">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1 mb-4 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-sm font-bold tracking-widest uppercase">
            Discover
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 capitalize">
            {category} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Events</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Explore curated events in the {category} category.
          </p>
        </div>

        {/* List Content */}
        {events.length === 0 ? (
          <div className="text-center py-24 bg-[#151518] rounded-[2.5rem] border border-gray-800 border-dashed">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center text-4xl">
              🔍
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
            <p className="text-gray-500">We couldn't find any events in this category at the moment.</p>
            <Link to="/auth/event/list" className="inline-block mt-6 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-secondary)] transition-colors">
              Browse All Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const isWishlisted = wishlist.includes(event.id);

              return (
                <div
                  key={event.id}
                  className="group relative bg-[#151518] rounded-[2.5rem] p-4 border border-gray-800 hover:border-[var(--color-primary)] transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(255,16,240,0.15)] flex flex-col h-full"
                >
                  {/* Image Area */}
                  <div className="relative h-64 overflow-hidden rounded-[2rem] mb-5">
                    <Link to={`/auth/event/detail/${event.id}`}>
                      <img
                        src={event.images || "https://placehold.co/600x400/151518/333?text=No+Image"}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151518] to-transparent opacity-30 group-hover:opacity-10 transition-opacity"></div>
                    </Link>

                    {/* Price Tag */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-wider">
                      {event.price && parseFloat(event.price) > 0 ? `$${event.price}` : "Free"}
                    </div>

                    {/* Wishlist Button */}
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

                    {/* Date Badge */}
                    <div className="absolute bottom-4 left-4 bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-xl shadow-lg border border-white/10">
                      <span className="text-xs font-bold uppercase tracking-widest">{formatEventDate(event.start_date)}</span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="px-2 pb-2 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                      <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="truncate">{event.location || event.venue || "Location TBA"}</span>
                    </div>

                    <Link to={`/auth/event/detail/${event.id}`} className="mt-auto">
                      <button className="w-full py-4 rounded-2xl bg-[#1F1F23] text-white font-bold uppercase tracking-wider text-xs border border-gray-700 group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)] transition-all duration-300">
                        View Details
                      </button>
                    </Link>
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

export default SearchEventsPage;
