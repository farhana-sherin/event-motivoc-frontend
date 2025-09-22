import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import { Link } from "react-router-dom";

const OrganizerEventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("organizer/event/list/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status_code === 6000) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading)
    return <div className="text-white text-center mt-10">Loading events...</div>;

  if (!events.length)
    return (
      <div className="text-white text-center mt-10">
        You have not created any events yet.
      </div>
    );

  return (
    <div className="w-[95%] max-w-7xl mx-auto py-10">
      <h2 className="text-3xl text-white font-bold mb-8">My Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-[#0c1030] shadow-lg border-b border-indigo-900/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            {/* Event Image */}
            <img
              src={event.images}
              alt={event.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>

              {/* Short Description */}
              <p className="text-gray-300 text-sm mb-2">{event.short_description}</p>

              {/* Date & Location */}
              <p className="text-gray-400 text-sm mb-1">
                {event.start_date} → {event.end_date}
              </p>
              <p className="text-gray-400 text-sm mb-2">{event.location}</p>

              {/* Tickets & View Button */}
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/OrganizerEventDetail/${event.id}`}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded hover:from-indigo-700 hover:to-purple-700 transition"
                >
                  View
                </Link>
                <span className="text-gray-300 text-sm">
                  Tickets: {event.ticket_count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizerEventList;
