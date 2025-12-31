import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useWishlist } from "../context/WishlistContext";

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("date_asc");
  const [loading, setLoading] = useState(true);

  const { wishlist, toggleWishlist } = useWishlist();

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("customer/events/list/", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data = res.data.data || [];
        setEvents(data);
        setFilteredEvents(data);

        const uniqueCats = ["All", ...new Set(data.map((e) => e.category))];
        setCategories(uniqueCats);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter & sort
  useEffect(() => {
    let updated = [...events];
    if (selectedCategory !== "All") {
      updated = updated.filter((e) => e.category === selectedCategory);
    }
    if (sortOption === "price_asc") updated.sort((a, b) => a.price - b.price);
    else if (sortOption === "price_desc") updated.sort((a, b) => b.price - a.price);
    else if (sortOption === "date_asc")
      updated.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    else if (sortOption === "date_desc")
      updated.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

    setFilteredEvents(updated);
  }, [selectedCategory, sortOption, events]);

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
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Explore a curated list of events happening around you.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 bg-[#151518] p-4 rounded-3xl border border-gray-800">

          {/* Category Filter */}
          <div className="relative">
            <label className="block text-gray-500 text-xs uppercase font-bold tracking-widest mb-1 ml-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-64 bg-[#0B0B0C] text-white px-5 py-3 rounded-xl border border-gray-700 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none appearance-none cursor-pointer hover:border-gray-600 transition-colors"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {/* Dropdown Arrow */}
            <div className="pointer-events-none absolute bottom-4 right-4 flex items-center text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <label className="block text-gray-500 text-xs uppercase font-bold tracking-widest mb-1 ml-1">Sort By</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full md:w-64 bg-[#0B0B0C] text-white px-5 py-3 rounded-xl border border-gray-700 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none appearance-none cursor-pointer hover:border-gray-600 transition-colors"
            >
              <option value="date_asc">Date (Soonest First)</option>
              <option value="date_desc">Date (Latest First)</option>
              <option value="price_asc">Price (Low → High)</option>
              <option value="price_desc">Price (High → Low)</option>
            </select>
            {/* Dropdown Arrow */}
            <div className="pointer-events-none absolute bottom-4 right-4 flex items-center text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>

        {/* List Content */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-24 bg-[#151518] rounded-[2.5rem] border border-gray-800 border-dashed">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center text-4xl">
              🔍
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
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

export default EventListPage;
