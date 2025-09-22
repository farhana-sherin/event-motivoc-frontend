import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useWishlist } from "../context/WishlistContext";

const FeaturedEvents = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const { wishlist, toggleWishlist } = useWishlist(); // use context

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosInstance.get("customer/featured/event/");
        const items = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data?.results)
          ? res.data.results
          : Array.isArray(res.data)
          ? res.data
          : [];
        setFeaturedEvents(items);
      } catch (error) {
        console.error("Error fetching featured events:", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="w-[95%] max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold mb-5 shadow-md">
            FEATURED EVENTS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            Discover Amazing Events
          </h2>
        </div>

        {featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredEvents.map((event) => {
              const isWishlisted = wishlist.includes(event.id);

              return (
                <div
                  key={event.id}
                  className="group rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 bg-white"
                >
                  {/* Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={event.images}
                      alt={event.title || "Event"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Heart icon */}
                    <button
                      onClick={() => toggleWishlist(event.id)}
                      className="absolute top-3 right-3 p-2 rounded-full transition-colors bg-white"
                    >
                      {isWishlisted ? (
                        <HeartSolid className="w-6 h-6 text-red-500" />
                      ) : (
                        <HeartOutline className="w-6 h-6 text-black hover:text-red-500" />
                      )}
                    </button>

                    {/* Price ribbon */}
                    <div className="absolute top-4 left-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 font-bold text-sm transform -rotate-12 shadow-lg">
                      {event.price ? `₹${event.price}` : "Free"}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4 z-10 pointer-events-none">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 pointer-events-auto">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-200 mb-2 line-clamp-3 pointer-events-auto">
                        {event.description || "No description available."}
                      </p>
                      <span className="inline-block px-3 py-1 bg-indigo-600 text-white font-semibold rounded-full shadow pointer-events-auto">
                        {event.category || "CONFERENCE"}
                      </span>
                    </div>
                  </div>

                  {/* Info below image */}
                  <div className="px-6 py-4 flex justify-between items-center bg-white relative z-20">
                    <span className="text-gray-700 font-semibold">
                      {event.start_date || "Date TBA"}
                    </span>
                    <Link to={`/event/detail/${event.id}`}>
                      <button className="w-full px-3 py-2 rounded-2xl text-white font-bold text-lg tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-4xl">🎪</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Featured Events Yet
            </h3>
            <p className="text-gray-600 text-lg">
              Check back soon for amazing events
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;