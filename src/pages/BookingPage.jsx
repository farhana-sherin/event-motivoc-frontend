import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
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

  if (loading) return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] items-center justify-center">
      <p className="text-white text-xl animate-pulse">Loading checkout...</p>
    </div>
  );
  if (!event) return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] items-center justify-center">
      <p className="text-red-500 text-xl font-bold">Event not found</p>
    </div>
  );

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-20 px-4 md:px-8 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#0c1020] to-transparent pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#0c1020] opacity-5 blur-[100px] rounded-full"></div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link to={`/auth/event/detail/${event.id}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
           <span className="w-8 h-8 rounded-full bg-[#1E1E24] flex items-center justify-center group-hover:bg-[#2D2D35] transition-colors">←</span>
           <span className="text-sm font-medium">Cancel & Return to Event</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* LEFT COLUMN: Event Snapshot */}
            <div className="flex-1 lg:max-w-2xl bg-[#1E1E24] rounded-3xl overflow-hidden border border-[#2D2D35] shadow-2xl flex flex-col md:flex-row lg:flex-col">
                {event.images && (
                  <div className="w-full md:w-1/3 lg:w-full h-48 md:h-auto lg:h-64 relative">
                      <img src={event.images} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151518] to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                           <span className="bg-[#1E1E24]/80 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold border border-[#2D2D35]">
                              {event.category || "Event"}
                           </span>
                      </div>
                  </div>
                )}
                
                <div className="p-8 flex-1 flex flex-col justify-center">
                    <h1 className="text-3xl font-black text-white mb-4 leading-tight">{event.title}</h1>
                    <div className="space-y-3 text-gray-400 text-sm">
                        <div className="flex items-center gap-3">
                            <span className="w-6 text-center">🗓</span>
                            <span>{new Date(event.start_date).toLocaleDateString(undefined, {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 text-center">📍</span>
                            <span>{event.location || "Venue TBA"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Checkout Action */}
            <div className="w-full lg:w-[420px] bg-[#1E1E24] rounded-3xl p-8 border border-[#2D2D35] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] h-fit sticky top-24">
                
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    Checkout 
                    <span className="text-xs font-normal text-gray-500 bg-[#0B0B0C] px-2 py-1 rounded ml-auto">Secure SSL</span>
                </h2>

                {/* Ticket Selector */}
                <div className="bg-[#151518] rounded-2xl p-4 border border-[#2D2D35] mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400 text-sm font-medium">Standard Ticket</span>
                        <span className="text-white font-bold">₹{event.price}</span>
                    </div>
                    <div className="flex items-center justify-between bg-[#1E1E24] p-1.5 rounded-xl">
                        <button onClick={handleDecrement} disabled={tickets <= 1} className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2D2D35] text-white hover:bg-[#3D3D45] disabled:opacity-30 transition-colors font-bold">−</button>
                        <span className="text-lg font-bold text-white w-12 text-center">{tickets}</span>
                        <button onClick={handleIncrement} disabled={tickets >= MAX_TICKETS || tickets >= event.ticket_count} className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2D2D35] text-white hover:bg-[#3D3D45] disabled:opacity-30 transition-colors font-bold">+</button>
                    </div>
                    <p className="text-right text-xs text-gray-500 mt-2">Max {MAX_TICKETS} tickets per booking</p>
                </div>

                <div className="w-full h-[1px] bg-white/5 my-6"></div>

                {/* Total */}
                <div className="flex justify-between items-end mb-8">
                    <span className="text-gray-400 text-sm">Total Amount</span>
                    <span className="text-4xl font-black text-white">₹{totalPrice}</span>
                </div>

                <button
                  onClick={handleBooking}
                  className="w-full py-4 rounded-xl text-white font-bold text-lg tracking-wide bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-purple-900/20"
                >
                  Pay Now
                </button>

                <p className="text-center text-gray-600 text-xs mt-6">
                    By clicking Pay Now, you agree to our Terms of Service.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;