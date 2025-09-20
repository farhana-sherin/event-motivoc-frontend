import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosinstance";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist from API when user logs in or app loads
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axiosInstance.get("customer/my_wishlist/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ids = res.data.data.map((item) => item.event.id);
        setWishlist(ids);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  // Add to wishlist
  const addToWishlist = async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to add wishlist");

    try {
      await axiosInstance.post(
        `customer/wishlist/add/${eventId}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist((prev) => [...prev, eventId]);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to remove wishlist");

    try {
      await axiosInstance.delete(`customer/wishlist/remove/${eventId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((id) => id !== eventId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const toggleWishlist = (eventId) => {
    if (wishlist.includes(eventId)) removeFromWishlist(eventId);
    else addToWishlist(eventId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
