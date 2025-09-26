import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import OrganizerLayout from "./OrganizerLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OrganizerAnalytics = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // number of payments per page

  const fetchPayments = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const offset = (pageNumber - 1) * pageSize;

      const res = await axiosInstance.get(
        `organizer/organizer/payment/?limit=${pageSize}&offset=${offset}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status_code === 6000) {
        setPayments(res.data.data);

        // Calculate total revenue (based on all data if API supports total)
        const revenue = res.data.data.reduce(
          (sum, payment) => sum + parseFloat(payment.amount),
          0
        );
        setTotalRevenue(revenue);

        if (res.data.total_count) {
          setTotalPages(Math.ceil(res.data.total_count / pageSize));
        } else {
          setTotalPages(pageNumber + 1); // fallback if total_count not provided
        }
      }
    } catch (err) {
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(page);
  }, [page]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const content = () => {
    if (loading) {
      return (
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-gray-600 font-medium">Loading analytics...</span>
            </div>
          </div>
        </div>
      );
    }

    // Prepare chart data
    const chartData = payments.map((p) => ({
      name: new Date(p.created_at).toLocaleDateString(),
      amount: parseFloat(p.amount),
    }));

    return (
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organizer Analytics</h1>
          <p className="text-gray-600">Track your event performance and revenue insights.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">₹{totalRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Payments</h3>
            <p className="text-3xl font-bold text-blue-600">{payments.length}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Payments Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Recent Payments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{p.event?.title || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{p.customer?.email || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">₹{p.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          p.status === "SUCCESS"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Previous
              </button>
              <span className="text-gray-600 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <OrganizerLayout>
      {content()}
    </OrganizerLayout>
  );
};

export default OrganizerAnalytics;
