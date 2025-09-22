import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import OrganizerBooking from "../component/OrganizerBooking";

export const OrganizerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("organizer/dashboard/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboard(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Loading dashboard...</p>;
  }

  if (!dashboard) {
    return <p className="text-center text-red-400">Failed to load dashboard</p>;
  }

  return (
    <div className=" mx-auto py-10 bg-[#0c1030] min-h-[calc(100vh-100px)]">
      <h2 className="text-3xl font-bold text-white mb-8"></h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Events */}
        <div className="p-6 bg-white/5 rounded-2xl border border-indigo-500/20">
          <h3 className="text-lg font-semibold text-white">Active Events</h3>
          <p className="text-2xl font-bold text-indigo-400">{dashboard.active_events}</p>
        </div>

        {/* Total Earnings */}
        <div className="p-6 bg-white/5 rounded-2xl border border-indigo-500/20">
          <h3 className="text-lg font-semibold text-white">Total Earnings</h3>
          <p className="text-2xl font-bold text-green-400">₹{dashboard.total_earnings}</p>
        </div>


        
        {/* Tickets Sold */}
        <div className="p-6 bg-white/5 rounded-2xl border border-indigo-500/20">
          <h3 className="text-lg font-semibold text-white">Tickets Sold</h3>
          <p className="text-2xl font-bold text-pink-400">{dashboard.tickets_sold}</p>
        </div>

      </div>
      <OrganizerBooking />
    </div>
  );
};


export default OrganizerDashboard;
