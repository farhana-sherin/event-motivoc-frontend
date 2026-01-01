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
        <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900">
            Your Notifications
          </h2>
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl shadow-sm border transition-all duration-300 ${notif.is_read ? "bg-gray-50 border-gray-100" : "bg-blue-50 border-blue-100 shadow-blue-100/50"
                  }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 mb-2">
                  <h3 className="font-bold text-gray-900 leading-tight">{notif.title}</h3>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {new Date(notif.created_at).toLocaleDateString()} {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-2 leading-relaxed">{notif.message}</p>
                <div className="flex items-center gap-1.5 opacity-60">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-tighter">Admin Notification</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizerNotifications;
