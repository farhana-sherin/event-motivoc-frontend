import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";

const CustomerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("customer/notification/", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setNotifications(res.data.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 text-lg animate-pulse">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] pt-24 px-6 pb-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#0c1020]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#070710]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#130c26]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl mb-6 shadow-[0_0_40px_rgba(124,58,237,0.4)] transform hover:scale-105 transition-transform">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Your <span className="text-[var(--color-primary)]">Notifications</span>
          </h1>
          <p className="text-white/60 text-lg font-medium">
            Stay updated with the latest news and updates
          </p>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-[#1E1E24] backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-[#2D2D35] text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-[#2D2D35] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Notifications Yet</h3>
            <p className="text-white/60">You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in-up">
            {notifications.map((notif, index) => (
              <div
                key={notif.id}
                className={`bg-[#1E1E24] backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] ${notif.is_read
                    ? 'border-[#2D2D35]'
                    : 'border-[var(--color-primary)]/50 shadow-[0_0_20px_rgba(124,58,237,0.15)]'
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${notif.is_read ? 'bg-[#2D2D35]' : 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]'
                    }`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-lg font-bold text-white">{notif.title}</h3>
                      {!notif.is_read && (
                        <span className="flex-shrink-0 px-3 py-1 bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-bold rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-white/70 mb-3 leading-relaxed">{notif.message}</p>
                    <div className="flex items-center gap-4 text-sm text-white/40">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(notif.created_at).toLocaleString()}
                      </span>
                      {notif.recipient_email && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                          {notif.recipient_email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerNotifications;
