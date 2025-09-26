import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const categories = ["Music", "Tech", "Sports", "Arts", "Culinary", "Business", "Other"];
  const filtered = categories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (value) => {
    setSearch(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSelect = (item) => {
    setSearch(item);
    setShowSuggestions(false);
  };

  const handleSubmitSearch = () => {
    if (search.trim()) {
      navigate(`/search/${search.toLowerCase()}`);
      setShowSuggestions(false);
    }
  };

 
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.user_id;
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  };

  const userId = getUserIdFromToken();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/customer/logout/",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-200/30 rounded-full">
      <div className="w-full max-w-8xl mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              Motivoc
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="nav-link-light hover:text-blue-600 font-medium">Home</Link>
            <Link to="/event/list" className="nav-link-light hover:text-blue-600 font-medium">Events</Link>
            <Link to="/view/all/booking" className="nav-link-light hover:text-blue-600 font-medium">Bookings</Link>
            <Link to="/my/notification" className="nav-link-light hover:text-blue-600 font-medium">Notifications</Link>
            <Link to="/support-ticket/create" className="nav-link-light hover:text-blue-600 font-medium">Support</Link>
          </div>

          {/* Search + Profile */}
          <div className="hidden lg:flex items-center space-x-4 relative">
            {/* Search */}
            <div className="relative group">
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search events..."
                className="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 shadow-sm outline-none w-40 focus:w-60 transition-all duration-300"
              />
              {showSuggestions && filtered.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-200">
                  {filtered.map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50"
                      onClick={() => handleSelect(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="h-10 w-10 rounded-full bg-gradient-to-tr from-gray-300 to-gray-100 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <span className="text-gray-800 font-semibold">U</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 z-50 text-start">
                  <Link
                    to={userId ? `/profile/${userId}` : "/login"}
                    className="block px-4 py-2 hover:bg-gray-100 font-medium"
                  >
                    Profile
                  </Link>
                  
                  <button
                    className="text-start w-full px-4 py-2 hover:bg-gray-100 font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
