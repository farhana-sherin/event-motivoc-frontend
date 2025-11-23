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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg font-medium text-gray-500 animate-pulse">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Browse{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Events
          </span>
        </h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <option value="date_asc">Date (Soonest First)</option>
            <option value="date_desc">Date (Latest First)</option>
            <option value="price_asc">Price (Low → High)</option>
            <option value="price_desc">Price (High → Low)</option>
          </select>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-600 text-lg">No events found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredEvents.map((event) => {
              const startDate = new Date(event.start_date);
              const endDate = new Date(event.end_date);
              const isWishlisted = wishlist.includes(event.id);

              return (
                <div
                  key={event.id}
                  className="group relative bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <Link to={`/event/detail/${event.id}`}>
                    <img
  src={event.images ? event.images : "/placeholder_event.jpg"}
  alt={event.title}
  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
/>
                    </Link>

                    {/* Heart icon */}
                    <button
                      onClick={() => toggleWishlist(event.id)}
                      className="absolute top-4 right-4 p-2 rounded-full transition-colors bg-white"
                    >
                      {isWishlisted ? (
                        <HeartSolid className="w-6 h-6 text-red-500" />
                      ) : (
                        <HeartOutline className="w-6 h-6 text-black hover:text-red-500" />
                      )}
                    </button>

                    {/* Date badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg text-center">
                      <p className="text-lg font-bold">
                        {startDate.toLocaleDateString("en-US", { day: "2-digit" })}
                      </p>
                      <p className="text-xs uppercase tracking-wide">
                        {startDate.toLocaleDateString("en-US", { month: "short" })}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {startDate.toLocaleDateString()} – {endDate.toLocaleDateString()}
                    </p>
                    <p className="text-base font-medium text-gray-900 mb-4">₹{event.price}</p>

                    <Link to={`/auth/event/detail/${event.id}`}>
                      <span className="mt-auto inline-block text-center px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow hover:opacity-90 transition duration-300">
                        View Details
                      </span>
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
