import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";
import QRCode from "react-qr-code";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get("booking_id");
  const sessionId = searchParams.get("session_id");

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookingId || !sessionId) return;

    const fetchPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(
          `/payment/verify/payment/${bookingId}/${sessionId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setPaymentData(response.data);

      } catch (err) {
        console.error(err);
        setError("Failed to fetch payment details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [bookingId, sessionId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white/60 text-lg">Loading payment details...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26]">
        <div className="bg-[#1E1E24] border border-[#2D2D35] rounded-3xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-[#1E1E24] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#2D2D35]">
            <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-[var(--color-primary)] text-lg font-semibold">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] flex items-center justify-center p-6 py-24">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#0c1020]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0c1020]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0c1020]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 bg-[#1E1E24] backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl w-full border border-[#2D2D35] animate-fade-in-up">
        {/* Success Icon with Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full mb-6 shadow-[0_0_40px_rgba(124,58,237,0.4)] animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            {paymentData.status === "SUCCESS" ? "Payment Successful!" : "Payment Pending"}
          </h1>
          <p className="text-white/60 text-lg">
            {paymentData.status === "SUCCESS"
              ? "🎉 Your booking has been confirmed!"
              : "Your payment is being processed..."}
          </p>
        </div>

        {/* Payment Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#151518] rounded-xl p-4 border border-[#2D2D35]">
            <p className="text-white/40 text-sm mb-1">Booking ID</p>
            <p className="text-white font-bold text-lg">#{paymentData.booking_id || paymentData.booking?.id}</p>
          </div>
          <div className="bg-[#151518] rounded-xl p-4 border border-[#2D2D35]">
            <p className="text-white/40 text-sm mb-1">Payment ID</p>
            <p className="text-white font-bold text-lg truncate">{paymentData.payment_id}</p>
          </div>
          <div className="bg-[#151518] rounded-xl p-4 border border-[#2D2D35]">
            <p className="text-white/40 text-sm mb-1">Amount Paid</p>
            <p className="text-[var(--color-secondary)] font-black text-2xl">₹{paymentData.amount}</p>
          </div>
          <div className="bg-[#151518] rounded-xl p-4 border border-[#2D2D35]">
            <p className="text-white/40 text-sm mb-1">Tickets</p>
            <p className="text-white font-bold text-lg">{paymentData.tickets_count || paymentData.booking?.tickets_count} Tickets</p>
          </div>
          <div className="bg-[#151518] rounded-xl p-4 border border-[#2D2D35] md:col-span-2">
            <p className="text-white/40 text-sm mb-1">Event</p>
            <p className="text-white font-bold text-lg">{paymentData.event?.title}</p>
          </div>
        </div>

        {/* QR Code Section */}
        {paymentData.qr_code_text && (
          <div className="mb-8">
            <h3 className="text-white font-bold text-xl mb-4 text-center">Your Event Ticket</h3>
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-2xl shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                <QRCode value={paymentData.qr_code_text} size={200} />
              </div>
            </div>
            <p className="text-center text-white/40 text-sm mt-4">
              Show this QR code at the event entrance
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            onClick={() => window.print()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Download / Print Ticket
          </button>
          <button
            className="flex-1 bg-[#2D2D35] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#3D3D45] transition-all duration-300 flex items-center justify-center gap-2"
            onClick={() => navigate("/")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
