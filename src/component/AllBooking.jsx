import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import { Link } from "react-router-dom";
import OrganizerLayout from "./OrganizerLayout";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const bookingsPerPage = 10;

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axiosInstance.get(
          "organizer/event/booking/all/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.status_code === 6000) {
          const sortedBookings = response.data.data.sort(
            (a, b) => new Date(b.booking_date) - new Date(a.booking_date)
          );
          setBookings(sortedBookings);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading bookings...</p>;
  if (!bookings.length)
    return <p className="text-center text-gray-500 mt-10">No bookings found.</p>;

  // Pagination
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  const startIndex = (currentPage - 1) * bookingsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + bookingsPerPage);

  return (
    <OrganizerLayout>
    <div className="w-[95%] max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Bookings</h2>

      {/* Bookings Table */}
      <div className="overflow-x-auto border rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-2 text-left">Event</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Tickets</th>
              <th className="px-4 py-2 text-left">Booking Date</th>
              <th className="px-4 py-2 text-left">Payment Status</th>
              <th className="px-4 py-2 text-left">Amount Paid</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((b) => (
              <tr key={b.booking_id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{b.event_title}</td>
                <td className="px-4 py-2 text-gray-700">
                  {b.customer_name} ({b.customer_email})
                </td>
                <td className="px-4 py-2 text-gray-700">{b.tickets_count}</td>
                <td className="px-4 py-2 text-gray-700">
                  {new Date(b.booking_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      b.payment_status === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : b.payment_status === "REFUNDED"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.payment_status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-700">₹{b.amount_paid}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? "bg-indigo-400 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          Next
        </button>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">{selectedBooking.event_title}</h3>

            <div className="space-y-2 text-gray-700">
              <p><strong>Customer:</strong> {selectedBooking.customer_name} ({selectedBooking.customer_email})</p>
              <p><strong>Tickets:</strong> {selectedBooking.tickets_count}</p>
              <p><strong>Booking Date:</strong> {new Date(selectedBooking.booking_date).toLocaleString()}</p>
              <p>
                <strong>Payment Status:</strong>{" "}
                <span
                  className={
                    selectedBooking.payment_status === "SUCCESS"
                      ? "text-green-600 font-semibold"
                      : selectedBooking.payment_status === "REFUNDED"
                      ? "text-yellow-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {selectedBooking.payment_status}
                </span>
              </p>
              <p><strong>Amount Paid:</strong> ₹{selectedBooking.amount_paid}</p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </OrganizerLayout>
  );
};  

export default AllBookings;
