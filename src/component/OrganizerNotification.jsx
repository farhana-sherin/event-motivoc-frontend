import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import OrganizerLayout from "./OrganizerLayout"; // make sure path is correct

const OrganizerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("organizer/notifications/", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        // The API returns data under "data" key
        setNotifications(res.data.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-gray-500 animate-pulse">
            Loading notifications...
          </p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No notifications found.</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto py-10 px-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Your Notifications
          </h2>
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-lg shadow ${notif.is_read ? "bg-gray-100" : "bg-blue-50"
                  }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(notif.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{notif.message}</p>
                <p className="text-xs text-gray-500">From: Admin</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizerNotifications;
