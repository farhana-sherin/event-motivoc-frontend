import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("customer/wishlist/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        const events = res.data.data.map(item => item.event);
        setWishlist(events);
      } catch (err) {
        console.error(err);
        setError("Failed to load wishlist. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading wishlist...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((event) => (
            <div
              key={event.id}
              className="border rounded-xl shadow-sm p-4 flex flex-col"
            >
              {event.images && (
                <img
                  src={event.images}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                {event.description}
              </p>
              <p className="font-bold text-emerald-600 mb-2">₹{event.price}</p>
              <Link to={`/auth/event/detail/${event.id}`}>
                      <button className="w-full px-3 py-2 rounded-2xl text-white font-bold text-lg tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                        View Details
                      </button>
             </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
