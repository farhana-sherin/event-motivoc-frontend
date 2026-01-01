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
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm animate-fade-in">
        <table className={`min-w-[800px] w-full divide-y divide-gray-200 ${typeStyles[type]}`}>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Admin Approved</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {eventList.length > 0 ? (
              eventList.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{e.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{e.start_date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{e.end_date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${e.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      e.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {e.status === "APPROVED" ? (
                      <span className="flex items-center gap-1.5 text-green-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        Yes
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                        No
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500 italic">
                  No {type} events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight">Manage <span className="text-indigo-600">Events</span></h2>
          <p className="text-gray-500 text-sm">Track and monitor your event status.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-8">
          {["pending", "upcoming", "past", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl font-bold transition-all duration-300 text-sm uppercase tracking-wider ${activeTab === tab
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                : "bg-white text-gray-500 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Active Table */}
        <div className="animate-fade-in-up">
          {renderEventTable(events[activeTab], activeTab)}
        </div>
      </div>
    </>
  );
};

export default AdminApprovedEvents;
