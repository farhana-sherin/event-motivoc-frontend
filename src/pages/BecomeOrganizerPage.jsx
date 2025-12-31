import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const BecomeOrganizerPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "customer/become/organizer/",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status_code === 6000) {
        alert("You are now an Organizer!");
      }

      navigate("/auth/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to become an organizer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#0c1020]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#070710]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1E1E24] border border-[#2D2D35] mb-8">
              <span className="text-2xl">🚀</span>
              <span className="text-white/80 text-sm font-bold uppercase tracking-wider">Join Our Platform</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Become an Event <span className="text-[var(--color-primary)]">Organizer</span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              Create and manage amazing events with our powerful platform. Start building unforgettable experiences today.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 bg-[#1E1E24] border border-[#2D2D35] rounded-xl p-4">
                <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-sm">Easy Setup</h3>
                  <p className="text-white/50 text-xs">Launch in minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#1E1E24] border border-[#2D2D35] rounded-xl p-4">
                <div className="w-10 h-10 bg-[var(--color-accent)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-sm">Secure Payments</h3>
                  <p className="text-white/50 text-xs">Safe transactions</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#1E1E24] border border-[#2D2D35] rounded-xl p-4">
                <div className="w-10 h-10 bg-[var(--color-secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-sm">Real-time Analytics</h3>
                  <p className="text-white/50 text-xs">Track performance</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* How It Works - Simplified */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-12">
              How It<span className="text-[var(--color-primary)]"> Works</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="bg-[#1E1E24] border border-[#2D2D35] rounded-2xl p-8 hover:border-[var(--color-primary)]/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Create Events</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Set up your event with our easy-to-use builder. Add details, pricing, and schedule.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#1E1E24] border border-[#2D2D35] rounded-2xl p-8 hover:border-[var(--color-accent)]/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Promote & Sell</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Share your event and sell tickets directly through our platform with secure payments.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#1E1E24] border border-[#2D2D35] rounded-2xl p-8 hover:border-[var(--color-secondary)]/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Track & Manage</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Monitor sales, manage attendees, and access analytics from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Final CTA */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Start?
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Join thousands of successful organizers creating amazing events.
            </p>
            <button
              onClick={handleGetStarted}
              className="px-10 py-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-bold text-lg rounded-xl shadow-[0_10px_40px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_50px_rgba(124,58,237,0.5)] hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider"
            >
              Become an Organizer
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BecomeOrganizerPage;

