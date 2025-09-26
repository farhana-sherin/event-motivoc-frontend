import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const OrganizerEventDetails = () => {
  const { id } = useParams(); // get event id from route
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEventDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        `organizer/events/detail/${id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status_code === 6000) {
        setEvent(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching event detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetail();
  }, [id]);

  if (loading)
    return <div className="text-white text-center mt-10">Loading...</div>;

  if (!event)
    return (
      <div className="text-white text-center mt-10">
        Event not found.
      </div>
    );

  return (
    <div className="w-[95%] max-w-4xl mx-auto py-10">
      <div className="bg-[#0c1030] shadow-lg border-b border-indigo-900/40 rounded-xl overflow-hidden">
        {/* Event Image */}
        <img
          src={event.images}
          alt={event.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          {/* Title & Category */}
          <h1 className="text-3xl text-white font-bold mb-2">{event.title}</h1>
          <p className="text-indigo-300 font-medium mb-4">Category: {event.category}</p>

          {/* Description */}
          <p className="text-gray-300 mb-4">{event.description}</p>

          {/* Dates & Time */}
          <p className="text-gray-400 mb-1">
            Start: {event.start_date} {event.start_time}
          </p>
          <p className="text-gray-400 mb-1">
            End: {event.end_date} {event.end_time}
          </p>

          {/* Location & Price */}
          <p className="text-gray-400 mb-1">Location: {event.location}</p>
          <p className="text-gray-400 mb-1">Price: ₹{event.price}</p>

          {/* Tickets */}
          <p className="text-gray-400 mb-4">Tickets: {event.ticket_count}</p>

          {/* QR Code Image & Text */}
          {event.qr_code_image && (
            <div className="bg-[#1a1f4a] p-4 rounded mb-4 text-center">
              <h4 className="text-white font-semibold mb-2">Event QR Code</h4>
              <a href={event.qr_code_image} download={`${event.title}-QR.png`}>
                <img
                  src={event.qr_code_image}
                  alt={`QR Code for ${event.title}`}
                  className="mx-auto w-48 h-48 mb-2"
                />
              </a>
              <p className="text-gray-300 break-all">{event.qr_code_text}</p>
              <p className="text-gray-400 text-sm mt-1">
                Scan or share this QR code with your customers
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Link
              to="/OrganizerEventList"
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            >
              Back to My Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerEventDetails;
