import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("customer/my/notification/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data.data); // adjust depending on your API response
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div>Loading notifications...</div>;

  if (!notifications.length) return <div>No notifications yet.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Notifications</h1>
      <ul>
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`p-4 mb-2 border rounded-lg ${
              n.is_read ? "bg-gray-100" : "bg-white font-semibold"
            }`}
          >
            <h2>{n.title}</h2>
            <p>{n.message}</p>
            <small>{new Date(n.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
