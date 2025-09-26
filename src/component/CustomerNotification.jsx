import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";

const CustomerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("customer/notification/", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setNotifications(res.data.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg text-gray-500 animate-pulse">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          My <span className="text-blue-600">Notifications</span>
        </h2>

        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-600 text-lg">No notifications found.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className={`p-4 rounded-xl shadow-sm border ${
                  notif.is_read ? "bg-gray-100" : "bg-white border-blue-500"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(notif.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{notif.message}</p>
                {notif.recipient_email && (
                  <p className="text-sm text-gray-400 mt-1">
                    To: {notif.recipient_email}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomerNotifications;
