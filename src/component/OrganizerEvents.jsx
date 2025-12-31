import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import { useNavigate, Link } from "react-router-dom";
import OrganizerLayout from "./OrganizerLayout";

const OrganizerEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      // Log the request for debugging
      console.log("Fetching organizer events with token:", token ? token.substring(0, 10) + "..." : "No token");

      // Changed from "organizer/events/upcoming/" to "organizer/event/list/" to fetch all events
      const response = await axiosInstance.get("organizer/event/list/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Events API response:", response);

      // Handle different response formats
      let eventsData = [];
      if (response.data && Array.isArray(response.data)) {
        eventsData = response.data;
      } else if (response.data && response.data.data) {
        if (Array.isArray(response.data.data)) {
          eventsData = response.data.data;
        } else if (Array.isArray(response.data.data.events)) {
          eventsData = response.data.data.events;
        }
      }

      console.log("Processed events data:", eventsData);
      setEvents(eventsData);
    } catch (err) {
      console.error("Error fetching events:", err);
      console.error("Error response:", err.response);
      alert("Failed to fetch events: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    const token = localStorage.getItem("token");
    try {
      await axiosInstance.delete(`organizer/event/delete/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event deleted successfully");
      fetchEvents(); // refresh list
    } catch (err) {
      console.error("Error deleting event:", err);
      console.error("Error response:", err.response);
      alert("Failed to delete event: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const content = () => {
    if (loading) {
      return (
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-gray-600 font-medium">Loading your events...</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Events</h1>
            <p className="text-gray-600">Manage and view all your created events.</p>
          </div>
          <button
            onClick={() => navigate("/auth/event/create")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create Event</span>
          </button>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tickets</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.length > 0 ? (
                  events.map((e) => (
                    <tr
                      key={e.id || e._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{e.title || "Untitled Event"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{e.start_date ? new Date(e.start_date).toLocaleDateString() : "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{e.end_date ? new Date(e.end_date).toLocaleDateString() : "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${e.status === 'APPROVED'
                            ? 'bg-green-100 text-green-800'
                            : e.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : e.status === 'CANCELLED'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                          {e.status || "UNKNOWN"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{e.ticket_count || e.tickets || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Link
                          to={`/auth/event/update/${e.id || e._id}`}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 font-medium"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/auth/OrganizerEventDetail/${e.id || e._id}`}
                          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200 font-medium"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => deleteEvent(e.id || e._id)}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-600 font-medium">No events found</p>
                        <p className="text-gray-500 text-sm mt-1">Click "Create Event" to add your first event</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {content()}
    </>
  );
};

export default OrganizerEvents;