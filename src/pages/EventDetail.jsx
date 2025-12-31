import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

export const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FIX TOKEN KEY
  const token = localStorage.getItem("access");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(
          `customer/events/detail/${id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEvent(response.data.data);
      } catch (err) {
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, token]);

  if (loading)
    return (
      <div className="flex bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] min-h-screen items-center justify-center">
        <p className="text-white text-xl animate-pulse">Loading event details...</p>
      </div>
    );

  if (!event)
    return (
      <div className="flex bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] min-h-screen items-center justify-center">
        <p className="text-red-500 text-xl">{error || "Event not found"}</p>
      </div>
    );

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] text-white overflow-x-hidden font-sans pb-20">

      {/* HERO SECTION */}
      <div className="relative w-full h-[45vh] md:h-[50vh] overflow-hidden">
        <img
          src={event.images || "/placeholder.jpg"}
          alt="Event Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070710] via-[#0c1020]/40 to-[#0c1020]/20"></div>

        {/* Back Button - High Z-Index for Visibility, pushed down to clear Header */}
        <Link
          to="/"
          className="absolute top-24 left-6 md:top-28 md:left-10 z-30
          flex items-center gap-2 text-white/90 bg-[#1E1E24]/40 backdrop-blur-md 
          px-4 py-2 rounded-full border border-[#2D2D35]
          hover:border-[var(--color-primary)] hover:bg-[#1E1E24]/60 transition-all shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="w-[95%] max-w-5xl mx-auto -mt-24 md:-mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT: MAIN DETAILS */}
          <div className="flex-1 bg-[#1E1E24] rounded-2xl p-6 md:p-8 shadow-2xl border border-[#2D2D35] backdrop-blur-sm">

            {/* Category Pill */}
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest">
              {event.category || "Event"}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-white leading-tight tracking-tight">
              {event.title}
            </h1>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2.5 text-gray-300 bg-[#151518] px-3 py-2 rounded-lg border border-[#2D2D35] text-sm">
                <span className="text-lg">🗓</span>
                <span className="font-medium">
                  {new Date(event.start_date).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-gray-300 bg-[#151518] px-3 py-2 rounded-lg border border-[#2D2D35] text-sm">
                <span className="text-lg">📍</span>
                <span className="font-medium truncate max-w-[200px]">{event.location || event.venue || "TBA"}</span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#2D2D35] my-6"></div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-200">About This Event</h3>

              {event.short_description && (
                <p className="text-base italic text-gray-400 border-l-2 border-[var(--color-secondary)] pl-3">
                  {event.short_description}
                </p>
              )}

              <p className="text-gray-400 leading-7 text-sm whitespace-pre-line font-light">
                {event.description}
              </p>
            </div>
          </div>

          {/* RIGHT: STICKY SIDEBAR (Smaller & Compact) */}
          <div className="w-full lg:w-[320px] sticky top-24 h-fit">
            <div className="bg-[#1E1E24] rounded-2xl p-6 border border-[#2D2D35] shadow-xl overflow-hidden relative">

              {/* Glow Effect */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0c1020]/10 blur-[50px] rounded-full pointer-events-none"></div>

              <div className="relative z-10">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Total Price</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-3xl font-black text-white">₹{event.price || "Free"}</span>
                  <span className="text-gray-500 text-xs mb-1">/person</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-gray-500 text-xs mb-1.5 font-medium">
                    <span>Availability</span>
                    <span className="text-[var(--color-secondary)]">Filling Fast</span>
                  </div>
                  <div className="w-full bg-[#2D2D35] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] w-[75%] h-full"></div>
                  </div>
                </div>

                {/* Main CTA */}
                <Link
                  to={`/auth/bookings/new?event=${event.id}`}
                  className="block w-full text-center py-3.5 rounded-xl font-bold text-base text-white
                  bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]
                  hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_5px_20px_rgba(255,16,240,0.25)]"
                >
                  Book Tickets
                </Link>

                <div className="mt-4 flex items-start gap-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-[10px] leading-relaxed">
                    Secure transaction. 100% money back guarantee if cancelled 24h prior.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EventDetail;
