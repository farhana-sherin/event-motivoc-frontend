import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const OrganizerHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0c1030] shadow-lg border-b border-indigo-900/40"
          : "bg-[#0c1030]"
      }`}
    >
      {/* Wrapper with 90% width */}
      <div className="w-[95%]  mx-auto px-4 md:px-6">
        {/* Flex Container */}
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg rounded">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold tracking-tight">
                Motivoc
              </h1>
              <p className="text-indigo-300 text-xs font-medium">
                Organizer Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500"
            >
              Dashboard
            </Link>
            <Link
              to="/OrganizerEventList"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500"
            >
              My Events
            </Link>
            <Link
              to="event/create/"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500"
            >
              Create Event
            </Link>
            <Link
              to="/organizer/analytics"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500"
            >
              Analytics
            </Link>
            
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Organizer Badge */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-indigo-500/30 rounded">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center rounded">
                <span className="text-white text-sm font-bold">O</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">Organizer</p>
                <p className="text-indigo-300 text-xs">Premium</p>
              </div>
            </div>

            {/* Back to Home Button */}
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24" 
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-indigo-900/40 bg-[#0c1030]/95">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500"
              >
                Home
              </Link>
              <Link
                to="/organizer/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500"
              >
                Dashboard
              </Link>
              <Link
                to="/organizer/events"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500"
              >
                My Events
              </Link>
              <Link
                to="/organizer/create-event"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500"
              >
                Create Event
              </Link>
              <Link
                to="/organizer/analytics"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500"
              >
                Analytics
              </Link>
              <Link
                to="/organizer/settings"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500"
              >
                Settings
              </Link>
              <div className="pt-4 border-t border-indigo-900/40">
                <button
                  onClick={() => {
                    navigate("/");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default OrganizerHeader;
