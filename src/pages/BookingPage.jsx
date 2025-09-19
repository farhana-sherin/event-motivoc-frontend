import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const BookingPage = () => {
  const { id: routeEventId } = useParams();
  const [searchParams] = useSearchParams();
  const queryEventId = searchParams.get("event");
  const eventId = routeEventId || queryEventId;

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const MAX_TICKETS = 5;
  const token = localStorage.getItem("token");

  // Fetch event details
  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(
          `customer/events/detail/${eventId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEvent(response.data.data);
        setTotalPrice(response.data.data.price);
      } catch (err) {
        console.error("Error fetching event:", err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, token]);

  const handleIncrement = () => {
    if (tickets >= MAX_TICKETS || tickets >= event.ticket_count) return;
    setTickets(tickets + 1);
    setTotalPrice((tickets + 1) * event.price);
  };

  const handleDecrement = () => {
    if (tickets <= 1) return;
    setTickets(tickets - 1);
    setTotalPrice((tickets - 1) * event.price);
  };

  const handleBooking = async () => {
    try {
      // Step 1: Create booking
      const bookingResponse = await axiosInstance.post(
        "payment/bookings/create/",
        { event: event.id, tickets_count: tickets },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const bookingId = bookingResponse.data.booking_id;
      if (!bookingId) {
        alert("Booking created, but booking ID not received.");
        return;
      }

      // Step 2: Create Stripe checkout session
      const checkoutResponse = await axiosInstance.post(
        `payment/payments/create-checkout-session/${bookingId}/`,
        { tickets_count: tickets },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Step 3: Redirect to Stripe checkout page
      window.location.href = checkoutResponse.data.checkout_url;
    } catch (err) {
      console.error("Booking/Payment failed:", err.response || err);
      alert("Booking or payment failed. Please check console for details.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading event...</div>;
  if (!event) return <div className="p-6 text-center text-red-500">Event not found</div>;

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-16">
      <div className="w-[95%] max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {event.images && (
          <img src={event.images} alt={event.title} className="w-full h-64 object-cover rounded-2xl mb-6" />
        )}

        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{event.title}</h1>
        <p className="text-gray-600 mb-2 italic">{event.short_description}</p>
        <p className="text-gray-500 mb-4 leading-relaxed">{event.description}</p>

        {/* Ticket Counter */}
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl mb-6">
          <span className="font-semibold text-gray-800">Tickets</span>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDecrement}
              disabled={tickets <= 1}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 disabled:opacity-50"
            >
              −
            </button>
            <span className="text-lg font-semibold text-gray-800">{tickets}</span>
            <button
              onClick={handleIncrement}
              disabled={tickets >= MAX_TICKETS || tickets >= event.ticket_count}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-semibold text-gray-800">Total Price</span>
          <span className="text-2xl font-bold text-gray-900">₹{totalPrice}</span>
        </div>

        <button
          onClick={handleBooking}
          className="w-full px-6 py-4 rounded-2xl text-white font-bold text-lg tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          Confirm Booking & Pay
        </button>
      </div>
    </section>
  );
};

export default BookingPage;
