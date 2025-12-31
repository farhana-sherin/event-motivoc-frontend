import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const OrganizerHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Navigate to login page
    navigate("/login");
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
      isScrolled
        ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
        : "bg-white/95 backdrop-blur-xl"
    }`}>
      <div className="w-full max-w-8xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => navigate("/auth/dashboard")}>
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Motivoc
              </h1>
              <p className="text-blue-600 text-xs font-medium">
                Organizer Portal
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Profile and Logout */}
            <div className="flex items-center space-x-3">
              {/* Profile Button */}
              <button
                onClick={() => navigate("/auth/organizer/profile")}
                className="relative group px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl shadow hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden sm:inline">Profile</span>
                </div>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="relative group px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OrganizerHeader;