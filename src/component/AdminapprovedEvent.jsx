import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import OrganizerLayout from "./OrganizerLayout";

const AdminApprovedEvents = () => {
  const [events, setEvents] = useState({
    upcoming: [],
    past: [],
    cancelled: [],
    pending: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const [upcomingRes, pastRes, pendingRes, cancelledRes] = await Promise.all([
          axiosInstance.get("organizer/events/upcoming/", { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get("organizer/events/past/", { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get("organizer/events/pending/", { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get("organizer/events/cancelled/", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setEvents({
          upcoming: upcomingRes.data.data,
          past: pastRes.data.data,
          pending: pendingRes.data.data,
          cancelled: cancelledRes.data.data,
        });
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="text-center text-gray-400 mt-10">Loading events...</p>;

  const renderEventTable = (eventList, type) => {
    const typeStyles = {
      upcoming: "border-blue-500 bg-blue-50",
      past: "border-gray-400 bg-gray-50",
      pending: "border-yellow-500 bg-yellow-50",
      cancelled: "border-red-500 bg-red-50",
    };

    return (
      <table className={`min-w-full divide-y divide-gray-200 border rounded-lg ${typeStyles[type]}`}>
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">Title</th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">Start Date</th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">End Date</th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">Status</th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">Admin Approved</th>
          </tr>
        </thead>
        <tbody>
          {eventList.length > 0 ? (
            eventList.map((e) => (
              <tr key={e.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-gray-800">{e.title}</td>
                <td className="px-4 py-2 text-gray-700">{e.start_date}</td>
                <td className="px-4 py-2 text-gray-700">{e.end_date}</td>
                <td className="px-4 py-2 capitalize text-gray-800">{e.status.toLowerCase()}</td>
                <td className="px-4 py-2 text-gray-800">{e.status === "APPROVED" ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center text-gray-600">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Events Management</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["pending", "upcoming", "past", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md font-medium ${activeTab === tab
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Active Table */}
        {renderEventTable(events[activeTab], activeTab)}
      </div>
    </>
  );
};

export default AdminApprovedEvents;
