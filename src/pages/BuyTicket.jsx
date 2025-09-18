import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

export const BuyTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [ticketsCount, setTicketsCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`customer/events/detail/${id}/`);
        setEvent(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load event details");
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    if (ticketsCount < 1) {
      setError("Please select at least 1 ticket");
      return;
    }
    try {
      const response = await axiosInstance.post(`customer/bookings/${id}/`, {
        tickets_count: ticketsCount,
      });
      setSuccess("Booking created successfully!");
      setError("");


        // ✅ Redirect to Payment Page with booking ID
        navigate(`/payment/${response.data.data.id}`);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Booking failed");
      setSuccess("");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading event details...</div>;
  if (!event) return <div className="p-6 text-center text-red-500">{error || "Event not found"}</div>;

  return (
    <section className="w-full h-screen flex items-center py-10 md:py-14">
      <div className="w-[95%] max-w-4xl mx-auto">
        <Link to={`/events`} className="text-sm text-indigo-600 hover:text-indigo-700">
          ← Back to events
        </Link>

        <div className="mt-6 p-6 rounded-2xl shadow-md bg-white">
          <h1 className="text-3xl font-extrabold mb-4">{event.title}</h1>
          <div className="text-gray-700 mb-4">
            📍 {event.location || event.venue || "Location TBA"} | 🗓 {event.start_date || "TBA"}
          </div>

          {/* Short description */}
          {event.short_description && (
            <div className="mb-4 text-gray-700 font-medium">
              {event.short_description}
            </div>
          )}

          {/* Long description */}
          {event.description && (
            <div className="mb-6 text-gray-800 whitespace-pre-line">
              {event.description}
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <label className="font-semibold">Tickets:</label>
            <input
              type="number"
              min="1"
              value={ticketsCount}
              onChange={(e) => setTicketsCount(parseInt(e.target.value))}
              className="w-20 border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div className="mb-4 text-lg font-semibold">
            Total: ₹ {event.price * ticketsCount}
          </div>

          {error && <div className="mb-4 text-red-600">{error}</div>}
          {success && <div className="mb-4 text-green-600">{success}</div>}
          

          <Link
            to={`/payment/${event.id}`}
            className="w-full md:w-auto px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow inline-block text-center"
          >
            Go to Payment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BuyTicket;
