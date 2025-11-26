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
      if (!token) {
        setWishlist([]);
        return;
      }

      try {
        const res = await axiosInstance.get("customer/wishlist/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && res.data.data && Array.isArray(res.data.data)) {
          const ids = res.data.data.map((item) => item.event.id);
          setWishlist(ids);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setWishlist([]); // Set empty array on error
      }
    };

    fetchWishlist();
  }, []);

  // Add to wishlist
  const addToWishlist = async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add wishlist");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `customer/wishlist/add/${eventId}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.status_code === 6000) {
        setWishlist((prev) => {
          if (!prev.includes(eventId)) {
            return [...prev, eventId];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to remove wishlist");
      return;
    }

    try {
      const response = await axiosInstance.delete(`customer/wishlist/remove/${eventId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status_code === 6000) {
        setWishlist((prev) => prev.filter((id) => id !== eventId));
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
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
