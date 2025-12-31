import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const ViewAllBooking = () => {
  const [latestBookings, setLatestBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("latest"); // latest or past
  const navigate = useNavigate();

  // Function to deeply search for a property in an object
  const deepSearch = (obj, propertyName, path = '') => {
    if (!obj || typeof obj !== 'object') return null;
    
    // Check if this object has the property
    if (obj.hasOwnProperty(propertyName) && obj[propertyName] !== null && obj[propertyName] !== undefined) {
      return { value: obj[propertyName], path: path ? `${path}.${propertyName}` : propertyName };
    }
    
    // Recursively search nested objects
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'object' && obj[key] !== null) {
        const currentPath = path ? `${path}.${key}` : key;
        const result = deepSearch(obj[key], propertyName, currentPath);
        if (result) return result;
      }
    }
    
    return null;
  };

  // Function to find payment amount in booking object
  const findPaymentAmount = (booking) => {
    console.log("=== FINDING PAYMENT AMOUNT ===");
    console.log("Booking object:", JSON.parse(JSON.stringify(booking)));
    
    // List of possible payment amount property names
    const paymentProperties = [
      'amount_paid',
      'total_amount', 
      'total',
      'price',
      'paid_amount',
      'amount',
      'cost',
      'ticket_price',
      'booking_amount'
    ];
    
    // Try to find each property using deep search
    for (let prop of paymentProperties) {
      const result = deepSearch(booking, prop);
      if (result) {
        console.log(`✅ FOUND payment amount '${prop}' at path: ${result.path} =`, result.value);
        return result.value;
      }
    }
    
    // If still not found, try to find any numeric property that might be the amount
    const findNumericAmount = (obj, path = '') => {
      if (!obj || typeof obj !== 'object') return null;
      
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const currentPath = path ? `${path}.${key}` : key;
          if (typeof obj[key] === 'number' && obj[key] > 0) {
            console.log(`🤔 Found numeric value at ${currentPath}:`, obj[key]);
          }
          
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            const nestedResult = findNumericAmount(obj[key], currentPath);
            if (nestedResult) return nestedResult;
          }
        }
      }
      return null;
    };
    
    findNumericAmount(booking);
    
    console.log("❌ No payment amount found in booking");
    return 0;
  };

  // Function to find ticket quantity in booking object
  const findTicketQuantity = (booking) => {
    console.log("=== FINDING TICKET QUANTITY ===");
    
    // List of possible ticket quantity property names
    const quantityProperties = [
      'tickets_count',
      'quantity',
      'no_of_tickets',
      'ticket_quantity',
      'count',
      'num_tickets'
    ];
    
    // Try to find each property using deep search
    for (let prop of quantityProperties) {
      const result = deepSearch(booking, prop);
      if (result) {
        console.log(`✅ FOUND ticket quantity '${prop}' at path: ${result.path} =`, result.value);
        return result.value;
      }
    }
    
    console.log("❌ No ticket quantity found in booking, defaulting to 1");
    return 1;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          setLoading(false);
          return;
        }
        
        console.log("Fetching bookings with token:", token.substring(0, 10) + "...");
        
        const res = await axiosInstance.get("customer/view/all/booking", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log("=== API RESPONSE ===");
        console.log("Full API response:", res);

        // Handle different response formats
        let data = {};
        if (res.data && res.data.data) {
          data = res.data.data;
        } else if (res.data) {
          data = res.data;
        }
        
        console.log("=== DATA STRUCTURE ===");
        console.log("Data object:", data);
        
        // Log the structure of bookings to understand the data
        if (data.latest_bookings && data.latest_bookings.length > 0) {
          console.log("Sample latest booking structure:", data.latest_bookings[0]);
        }
        if (data.past_bookings && data.past_bookings.length > 0) {
          console.log("Sample past booking structure:", data.past_bookings[0]);
        }
        
        // Set latest bookings
        if (data.latest_bookings && Array.isArray(data.latest_bookings)) {
          setLatestBookings(data.latest_bookings);
          console.log("Latest bookings set:", data.latest_bookings.length);
        } else if (data.upcoming && Array.isArray(data.upcoming)) {
          setLatestBookings(data.upcoming);
          console.log("Upcoming bookings set:", data.upcoming.length);
        } else {
          setLatestBookings([]);
          console.log("No latest bookings found in response");
        }
        
        // Set past bookings
        if (data.past_bookings && Array.isArray(data.past_bookings)) {
          setPastBookings(data.past_bookings);
          console.log("Past bookings set:", data.past_bookings.length);
        } else if (data.history && Array.isArray(data.history)) {
          setPastBookings(data.history);
          console.log("History bookings set:", data.history.length);
        } else {
          setPastBookings([]);
          console.log("No past bookings found in response");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        console.error("Error response:", error.response);
        setLatestBookings([]);
        setPastBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white font-medium tracking-wide animate-pulse">Loading Tickets...</p>
        </div>
      </div>
    );
  }
  
  const bookingsToShow = activeTab === "latest" ? latestBookings : pastBookings;
  
  console.log("Displaying", activeTab, "bookings:", bookingsToShow.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-20 px-4 relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#151518] to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Your Tickets</h2>
          <p className="text-gray-400">Manage your upcoming experiences and past memories.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 p-1 bg-[#1A1A1E] backdrop-blur-md rounded-full w-fit mx-auto border border-gray-800/50">
          {['latest', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                  ? "bg-[var(--color-primary)] text-white shadow-lg shadow-pink-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {tab === "latest" ? "Upcoming" : "Past"}
            </button>
          ))}
        </div>

        {bookingsToShow.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-800 rounded-3xl bg-[#151518]/50">
            <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6 text-4xl opacity-50">🎫</div>
            <p className="text-gray-400 text-lg font-medium mb-8">
              {activeTab === "latest" ? "No upcoming tickets." : "No past events."}
            </p>
            {activeTab === "latest" && (
              <Link to="/" className="px-8 py-3 rounded-xl bg-white text-black font-bold text-sm tracking-wide hover:bg-gray-200 transition">
                Explore Events
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {bookingsToShow.map((booking) => {
              // Handle different data structures
              const event = booking.event || booking;
              const startDate = new Date(event.start_date || event.date);
              const bookingDate = new Date(booking.booking_date || booking.created_at || booking.date);
              
              // Find payment amount and ticket quantity using our helper functions
              const paymentAmount = findPaymentAmount(booking);
              const ticketQuantity = findTicketQuantity(booking);

              return (
                <div key={booking.id || booking.booking_id || Math.random()} className="group relative w-full flex flex-col md:flex-row bg-[#1E1E24] rounded-3xl overflow-hidden border-2 border-transparent hover:border-[var(--color-primary)] transition-all duration-300">

                  {/* Left: Image/Date Stub */}
                  <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                    <img src={event.images || event.image || "/placeholder.jpg"} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>

                    <div className="absolute top-4 left-4 bg-[#1E1E24]/10 backdrop-blur-md border border-[#2D2D35] px-3 py-1.5 rounded-lg">
                      <span className="block text-center text-xs text-white/80 uppercase font-bold">{startDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span className="block text-center text-xl text-white font-black">{startDate.getDate()}</span>
                    </div>
                  </div>

                  {/* Divider (Dashed Line) - Visible on Desktop */}
                  <div className="hidden md:block w-[1px] bg-[#2D2D35] my-4 relative">
                    <div className="absolute -top-6 -left-3 w-6 h-6 bg-[#1E1E24] rounded-full"></div>
                    <div className="absolute -bottom-6 -left-3 w-6 h-6 bg-[#1E1E24] rounded-full"></div>
                    <div className="absolute top-0 bottom-0 left-[50%] -translate-x-1/2 border-l border-dashed border-[#2D2D35] h-full"></div>
                  </div>

                  {/* Right: Details */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-1 block">
                          {event.category || "Event"}
                        </span>
                        <h3 className="text-2xl font-black text-white leading-tight mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                          {event.title || "Untitled Event"}
                        </h3>
                        <p className="text-gray-400 text-sm flex items-center gap-2">
                          <span>📍</span> {event.location || event.venue || "Venue TBA"}
                        </p>
                      </div>

                    </div>

                    {/* Mobile Layout for Details */}
                    <div className="grid grid-cols-2 gap-4 md:hidden mb-6">
                      <div>
                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Quantity</p>
                        <p className="text-white font-bold">{ticketQuantity} Tickets</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Total Paid</p>
                        <p className="text-white font-bold">₹{paymentAmount}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Booked On</p>
                        <p className="text-white font-bold">{bookingDate.toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Desktop Layout for Details */}
                    <div className="hidden md:flex items-end justify-between mt-6">
                      <div className="flex gap-8">
                        <div>
                          <p className="text-gray-500 text-xs uppercase font-bold mb-1">Quantity</p>
                          <p className="text-white font-bold">{ticketQuantity} Tickets</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs uppercase font-bold mb-1">Total Paid</p>
                          <p className="text-white font-bold">₹{paymentAmount}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs uppercase font-bold mb-1">Booked On</p>
                          <p className="text-white font-bold">{bookingDate.toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {activeTab === "past" && (booking.can_review || booking.reviewable) && (
                          <button onClick={() => navigate(`/auth/event/${event.id || event.event_id}/reviews`)} className="px-5 py-2 rounded-xl text-xs font-bold border border-[#2D2D35] text-gray-300 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors">
                            Write Review
                          </button>
                        )}
                        <Link to={`/auth/booking/${booking.id || booking.booking_id}`} className="px-6 py-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg">
                          View Ticket
                        </Link>
                      </div>
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="flex md:hidden gap-3 mt-4">
                      {activeTab === "past" && (booking.can_review || booking.reviewable) && (
                        <button onClick={() => navigate(`/auth/event/${event.id || event.event_id}/reviews`)} className="px-4 py-2 rounded-xl text-xs font-bold border border-[#2D2D35] text-gray-300 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors flex-1">
                          Write Review
                        </button>
                      )}
                      <Link to={`/auth/booking/${booking.id || booking.booking_id}`} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg flex-1 text-center">
                        View Ticket
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllBooking;