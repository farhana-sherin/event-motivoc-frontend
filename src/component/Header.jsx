import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "./AuthHook";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const {isAuthenticated, logout} = useContext(AuthContext)


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
      navigate(`/auth/search/${search.toLowerCase()}`);
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

  const handleLogout = () => {
    logout()
    navigate("/login")
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-200/30">
      <div className="w-full max-w-8xl mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex items-center justify-center ring-1 ring-white/40 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              Motivoc
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="nav-link-light text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg transition-colors">Home</Link>
            <Link to="/auth/event/list" className="nav-link-light text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg transition-colors">Events</Link>
            <Link to="/auth/view/all/booking" className="nav-link-light text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg transition-colors">Bookings</Link>
            <Link to="/auth/my/notification" className="nav-link-light text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg transition-colors">Notifications</Link>
            <Link to="/auth/support-ticket/create" className="nav-link-light text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg transition-colors">Support</Link>
            <Link to="/auth/wishlist" className="nav-link-light text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg transition-colors">
            

              WishList
            </Link>
            

          </div>

          {/* Search + Profile */}
          <div className="hidden lg:flex items-center space-x-4 relative">
            {/* Search */}
            <div className="relative w-40 lg:w-64">
  <input
    type="text"
    value={search}
    onChange={(e) => handleSearch(e.target.value)}
    placeholder="Search categories..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 pr-10 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-300 transition"
  />
  {/* Inline small "S" button */}
  <button
    onClick={handleSubmitSearch}
    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400/40 transition"
    title="Search"
  >
    S
  </button>

  {showSuggestions && filtered.length > 0 && (
    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-200">
      {filtered.map((item, idx) => (
        <button
          key={idx}
          className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors"
          onClick={() => handleSelect(item)}
        >
          {item}
        </button>
      ))}
    </div>
  )}
</div>

            {/* Profile */}
            {
              isAuthenticated ? <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="h-10 w-10 rounded-full bg-gradient-to-tr from-gray-300 to-gray-100 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 ring-1 ring-white/40 transition-all duration-300"
              >
                <span className="text-gray-800 font-semibold">U</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 z-50 text-start">
                  <Link
                    to={userId ? `/auth/profile/${userId}` : "/login"}
                    className="block px-4 py-2 hover:bg-gray-100 font-medium transition-colors"
                  >
                    Profile
                  </Link>
                  
                  <button
                    className="text-start w-full px-4 py-2 hover:bg-gray-100 font-medium transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div> : <button className="px-3 py-1 text-white font-bold bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow hover:shadow-md hover:brightness-110 transition" onClick={()=> navigate('/login')} > Login</button>
            }
            
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 shadow-sm"
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/auth/event/list" 
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link 
              to="/auth/view/all/booking" 
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Bookings
            </Link>
            <Link 
              to="/auth/my/notification" 
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Notifications
            </Link>
            <Link 
              to="/auth/support-ticket/create" 
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Support
            </Link>
            <Link 
              to="/auth/wishlist" 
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              WishList
            </Link>
            
            {/* Mobile Search */}
            <div className="px-4 pt-2">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 pr-10 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-300 transition"
                />
                <button
                  onClick={handleSubmitSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400/40 transition"
                  title="Search"
                >
                  S
                </button>
              </div>
              {showSuggestions && filtered.length > 0 && (
                <div className="mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-200">
                  {filtered.map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors"
                      onClick={() => {
                        handleSelect(item);
                        setIsOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Profile */}
            <div className="px-4 pt-2 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to={userId ? `/auth/profile/${userId}` : "/login"}
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  className="w-full px-4 py-2 text-white font-bold bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow hover:shadow-md hover:brightness-110 transition text-center"
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
