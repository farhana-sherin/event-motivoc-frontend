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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 text-lg">Loading payment details...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full text-center border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          🎉 Payment {paymentData.status === "SUCCESS" ? "Successful!" : "Pending"}
        </h1>

        {/* Booking and Payment Details */}
        <div className="text-left space-y-3 mb-6">
          <p>
            <span className="font-semibold text-gray-700">Booking ID:</span>{" "}
            <span className="text-gray-900">{paymentData.booking_id || paymentData.booking?.id}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Payment ID:</span>{" "}
            <span className="text-gray-900">{paymentData.payment_id}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Amount Paid:</span>{" "}
            <span className="text-gray-900">₹{paymentData.amount}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Tickets:</span>{" "}
            <span className="text-gray-900">{paymentData.tickets_count || paymentData.booking?.tickets_count}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Event:</span>{" "}
            <span className="text-gray-900">{paymentData.event?.title}</span>
          </p>
        </div>

        

        {/* QR Code + Download / Print Button */}
        <div className="mt-6 flex flex-col items-center space-y-6">
          {paymentData.qr_code_text && (
            <div className="p-5 bg-gray-100 rounded-xl shadow-md">
              <QRCode value={paymentData.qr_code_text} size={200} />
            </div>
          )}

          <button
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300"
            onClick={() => window.print()}
          >
            Download / Print Ticket
          </button>
        </div>


        {/* Go to Homepage Button */}
        <button
          className="mb-6 px-6 py-3 bg-gray-600 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-700 transition duration-300 mt-20"
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
