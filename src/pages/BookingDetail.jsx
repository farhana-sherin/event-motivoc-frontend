import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";
import QRCode from "react-qr-code";

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get(
          `customer/booking/detail/${bookingId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBooking(response.data.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
        // Add a check to navigate/show error if the booking is inaccessible/not found
        if (err.response && err.response.status === 404) {
             setBooking(null); // Explicitly set to null to trigger "Not Found" UI
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId, token]);

  const handleCancelBooking = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking? The refund will be processed after admin approval.")) return;

    setCancelling(true);
    try {
      const response = await axiosInstance.post(
        `customer/booking/cancel/${bookingId}/`,
        { refund_amount: booking.amount_paid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking cancellation requested. Refund will be processed after admin approval.");

      // Update booking with cancellation status
      setBooking(prev => ({
        ...prev,
        payment_status: "CANCELLED",
        refund_status: "PENDING_APPROVAL"
      }));
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert(err.response?.data?.error || "Failed to cancel booking. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  // Function to download ticket as HTML without QR code
  const handleDownloadTicket = () => {
    // Re-create the HTML content for PDF without QR code (as before)
    const ticketHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Ticket - ${booking.event.title}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
        .ticket { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .booking-id { font-size: 14px; opacity: 0.8; margin-top: 5px; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: bold; color: #2c3e50; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px; }
        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .detail-item { margin-bottom: 10px; }
        .detail-label { font-weight: bold; color: #7f8c8d; font-size: 14px; }
        .detail-value { font-size: 16px; color: #2c3e50; }
        .footer { background: #ecf0f1; padding: 20px; text-align: center; font-size: 12px; color: #7f8c8d; }
        @media print {
          body { background: white; }
          .ticket { box-shadow: none; margin: 0; }
        }
      </style>
    </head>
    <body>
      <div class="ticket">
        <div class="header">
          <h1>${booking.event.title}</h1>
          <div class="booking-id">Booking ID: #${booking.id}</div>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Event Details</div>
            <div class="details-grid">
              <div class="detail-item">
                <div class="detail-label">Date</div>
                <div class="detail-value">${new Date(booking.event.start_date).toLocaleDateString()}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Time</div>
                <div class="detail-value">${new Date(booking.event.start_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Location</div>
                <div class="detail-value">${booking.event.location || "Venue TBA"}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Category</div>
                <div class="detail-value">${booking.event.category || "General"}</div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Booking Information</div>
            <div class="details-grid">
              <div class="detail-item">
                <div class="detail-label">Tickets</div>
                <div class="detail-value">${booking.tickets_count} Person(s)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Total Paid</div>
                <div class="detail-value">₹${booking.amount_paid}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Booking Date</div>
                <div class="detail-value">${new Date(booking.booking_date).toLocaleDateString()}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Status</div>
                <div class="detail-value">${booking.payment_status}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for your booking! | This is an official ticket for the event</p>
          <p>Customer: ${booking.customer_name || "N/A"} | Email: ${booking.customer_email || "N/A"}</p>
        </div>
      </div>
    </body>
    </html>
    `;
    
    const blob = new Blob([ticketHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${booking.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- Utility Functions (Keep as is) ---
  if (loading) return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-medium tracking-wide animate-pulse">Loading booking details...</p>
      </div>
    </div>
  );
  
  if (!booking) return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33.184-.558.43-1.097.734-1.617M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-500 text-xl font-bold mb-2">Booking Not Found</p>
        <p className="text-gray-500 mb-6">The booking you're looking for doesn't exist or has been removed.</p>
        <Link to="/auth/view/all/booking" className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:bg-[var(--color-secondary)] transition-colors">
          Back to My Bookings
        </Link>
      </div>
    </div>
  );

  // Format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-500/10 text-green-500 border border-green-500/20";
      case "REFUNDED":
        return "bg-red-500/10 text-red-500 border border-red-500/20";
      case "CANCELLED":
        return "bg-red-500/10 text-red-500 border border-red-500/20";
      case "PENDING_REFUND":
        return "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border border-gray-500/20";
    }
  };

  // Generate QR code value - URL to this page
  const getQRCodeValue = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/auth/booking/${booking.id}`;
  };

  // Copy URL to clipboard
  const copyUrlToClipboard = () => {
    const url = getQRCodeValue();
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
      alert('Failed to copy URL. Please try again.');
    });
  };

  // Check if booking is cancelled
  const isBookingCancelled = booking.payment_status === "CANCELLED" || booking.payment_status === "REFUNDED";
  // --- End Utility Functions ---

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] py-24 px-2 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#151518] to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with improved visibility */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-xl border border-gray-700 p-4 ">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Booking Details</h1>
            <p className="text-gray-300 text-sm">Your ticket information and event details</p>
          </div>
          <Link 
            to="/auth/view/all/booking" 
            className="flex items-center gap-1 text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10 border border-gray-600 bg-gray-800/50 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-medium">Back</span>
          </Link>
        </div>

        {isBookingCancelled && (
          <div className="mb-4 p-4 bg-red-900/30 border border-red-700/50 rounded-xl">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-red-400 font-bold">Booking Cancelled</p>
                <p className="text-red-300 text-sm">
                  {booking.payment_status === "REFUNDED" 
                    ? "This booking has been refunded." 
                    : "Refund pending admin approval."}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Left Column - Merged Event & Booking Details */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Ticket & Booking Details Card (Merged) */}
            <div className="bg-gradient-to-br from-[#151518] to-[#0B0B0C] rounded-xl border border-gray-800 overflow-hidden">
              <div className="relative h-40">
                <img
                  src={booking.event.images || "/placeholder.jpg"}
                  alt={booking.event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/70 to-transparent"></div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusBadgeClass(booking.payment_status)}`}>
                    {booking.payment_status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h2 className="text-xl font-bold text-white leading-tight mb-1">{booking.event.title}</h2>
                  <p className="text-gray-300 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {booking.event.location || "Venue TBA"}
                  </p>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-3 border-b border-gray-800 pb-2">Event Information</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#1a1a2e]/50 p-3 rounded-lg border border-gray-700/50">
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Event Date & Time</p>
                    <p className="text-white font-medium">{formatDate(booking.event.start_date)}</p>
                    <p className="text-gray-300 text-xs mt-1">{formatTime(booking.event.start_date)} - {formatTime(booking.event.end_date)}</p>
                  </div>
                  <div className="bg-[#1a1a2e]/50 p-3 rounded-lg border border-gray-700/50">
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Category / Organizer</p>
                    <p className="text-white font-medium">{booking.event.category || "General"}</p>
                    <p className="text-gray-300 text-xs mt-1">{booking.event.organizer_name || "Organizer"}</p>
                  </div>
                </div>

                {booking.event.description && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-2">Description</p>
                    <p className="text-gray-200 text-sm">{booking.event.description}</p>
                  </div>
                )}

                {/* Booking Summary - Integrated */}
                <h3 className="text-lg font-bold text-white mb-3 mt-6 border-b border-gray-800 pb-2">Booking Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-400">Booking ID</p>
                    <p className="text-white font-mono font-medium">#{booking.id}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-400">Booking Date</p>
                    <p className="text-white font-medium">{formatDate(booking.booking_date)}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-400">Tickets Booked</p>
                    <p className="text-white font-medium">{booking.tickets_count} Person(s)</p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-400">Price per Ticket</p>
                    <p className="text-white font-medium">₹{booking.amount_paid / booking.tickets_count}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                    <p className="text-gray-300 text-base uppercase tracking-wider font-bold">Total Paid</p>
                    <p className="text-2xl font-bold text-[var(--color-primary)]">₹{booking.amount_paid}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Ticket & Actions (Remains the same structure) */}
          <div className="space-y-4">
            {/* Digital Ticket with QR Code */}
            <div className="bg-gradient-to-br from-[#151518] to-[#0B0B0C] rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-[#0f3460] to-[#1a1a2e]">
                <h3 className="text-lg font-bold text-white">Digital Ticket</h3>
                <p className="text-gray-300 text-xs mt-1">Show this QR code at the entrance</p>
              </div>
              
              <div className="p-4">
                {/* Actual QR Code Display using react-qr-code */}
                {isBookingCancelled ? (
                  <div className="bg-gray-900 p-5 rounded-lg flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-center text-sm font-medium">
                      Ticket Invalid<br/>
                      {booking.payment_status === "REFUNDED" ? "Booking Refunded" : "Booking Cancelled"}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white p-3 rounded-lg flex flex-col items-center justify-center">
                    <div className="p-2 bg-white rounded-md border border-gray-200">
                      <QRCode value={getQRCodeValue()} size={120} />
                    </div>
                    <p className="text-gray-700 text-xs text-center mt-2">Scan for entry</p>
                  </div>
                )}
                
                {/* Instructions for scanning */}
                {!isBookingCancelled && (
                  <div className="mt-3 text-center">
                    <p className="text-gray-400 text-xs">
                      Scan to open details page
                    </p>
                    <button 
                      onClick={copyUrlToClipboard}
                      className="mt-1 text-[var(--color-primary)] text-xs underline hover:text-[var(--color-secondary)]"
                    >
                      Copy URL
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gradient-to-r from-[#16213e] to-[#0f3460]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Ticket Holder</p>
                    <p className="text-white text-sm font-medium mt-1">{booking.customer_name || "Customer Name"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Status</p>
                    <p className={`text-xs font-bold mt-1 ${getStatusBadgeClass(booking.payment_status).includes('green') ? 'text-green-400' : 
                      getStatusBadgeClass(booking.payment_status).includes('red') ? 'text-red-400' : 'text-yellow-400'}`}>
                      {booking.payment_status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gradient-to-br from-[#151518] to-[#0B0B0C] rounded-xl border border-gray-800 p-4">
              <h3 className="text-lg font-bold text-white mb-3">Actions</h3>
              
              <div className="space-y-2">
                {booking.payment_status === "SUCCESS" && (
                  <button
                    onClick={handleCancelBooking}
                    disabled={cancelling}
                    className="w-full px-3 py-2 bg-gradient-to-r from-red-900/30 to-red-700/30 text-red-400 hover:from-red-800/40 hover:to-red-600/40 border border-red-700/50 hover:border-red-600 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {cancelling ? "Cancelling..." : "Cancel Booking"}
                  </button>
                )}
                
                {!isBookingCancelled && (
                  <button 
                    onClick={handleDownloadTicket}
                    className="w-full px-3 py-2 bg-gradient-to-r from-blue-900/30 to-indigo-700/30 text-blue-300 hover:from-blue-800/40 hover:to-indigo-600/40 border border-blue-700/50 hover:border-blue-600 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Download Ticket
                  </button>
                )}
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;