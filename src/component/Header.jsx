import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthHook";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

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
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border-b border-[#1f2937] shadow-[0_10px_40px_rgba(17,24,39,0.45)]">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-accent)] to-black flex items-center justify-center text-white font-black text-2xl shadow-[0_0_20px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_28px_rgba(91,33,182,0.75)] transition-all">
              M
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter">
              Moti<span className="text-[var(--color-text-secondary)]">vok</span>
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-5">
            {[
              { to: "/", label: "Home" },
              { to: "/auth/event/list", label: "Events" },
              { to: "/auth/view/all/booking", label: "Bookings" },
              { to: "/auth/support", label: "Support" },

            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-bold text-white/80 hover:text-white tracking-wide uppercase transition-all px-3 py-2 rounded-lg    "
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search */}
            <div className="relative group">
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search..."
                className="w-48 bg-[#0f172a] border border-[#1f2937] text-white px-4 py-2 rounded-full text-sm focus:outline-none focus:border-[var(--color-primary)] focus:w-64 transition-all duration-300"
              />
              <button
                onClick={handleSubmitSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>

              {showSuggestions && filtered.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full bg-[#0f172a] border border-[#1f2937] rounded-xl shadow-2xl overflow-hidden backdrop-blur">
                  {filtered.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelect(item)}
                      className="px-4 py-2 text-white/80 hover:bg-[#111827] hover:text-white cursor-pointer transition text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="h-9 w-9 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] p-[2px]">
                    <div className="h-full w-full rounded-full bg-[#0b0b12] flex items-center justify-center text-white font-bold text-sm hover:bg-transparent transition-all">
                      {userId ? "U" : "U"}
                    </div>
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-4 w-56 bg-gradient-to-br from-[#0c1020] via-[#0f172a] to-[#130c26] border border-[#1f2937] rounded-xl shadow-2xl overflow-hidden py-2 animate-fade-in-up backdrop-blur">
                    <Link
                      to="/auth/profile/1"
                      className="block px-4 py-2.5 text-white/85 hover:bg-gradient-to-r hover:from-[var(--color-primary)]/15 hover:to-[var(--color-accent)]/20 hover:text-[var(--color-text-secondary)] transition text-sm font-medium bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border-b border-[#1f2937]"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/auth/my/notification"
                      className="block px-4 py-2.5 text-white/85 hover:bg-gradient-to-r hover:from-[var(--color-primary)]/15 hover:to-[var(--color-accent)]/20 hover:text-[var(--color-text-secondary)] transition text-sm font-medium bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border-b border-[#1f2937]"
                      onClick={() => setProfileOpen(false)}
                    >
                      Notifications
                    </Link>
                    <Link
                      to="/auth/wishlist"
                      className="block px-4 py-2.5 text-white/85 hover:bg-gradient-to-r hover:from-[var(--color-primary)]/15 hover:to-[var(--color-accent)]/20 hover:text-[var(--color-text-secondary)] transition text-sm font-medium bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border-b border-[#1f2937]"
                      onClick={() => setProfileOpen(false)}
                    >
                      Wishlist
                    </Link>
                    <div className="h-[1px] bg-[#2D2D35] my-2"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2.5 text-[#f472b6] hover:bg-gradient-to-r hover:from-[var(--color-primary)]/15 hover:to-[var(--color-secondary)]/20 transition text-sm font-medium bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26]"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-white/80 hover:text-white font-bold text-sm tracking-wide transition-colors">LOGIN</Link>
                <Link to="/register" className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:-translate-y-0.5 transition-all duration-300">
                  GET TICKET
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white"
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
          <div className="lg:hidden mt-4 bg-gradient-to-br from-[#0c1020] via-[#0f172a] to-[#130c26] rounded-2xl p-4 border border-[#1f2937] animate-fade-in-up backdrop-blur">
            <div className="flex flex-col gap-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-3 text-white font-bold rounded-xl transition bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border border-[#1f2937] hover:border-[var(--color-primary)]">Home</Link>
              <Link to="/auth/event/list" onClick={() => setIsOpen(false)} className="px-4 py-3 text-white/80 font-bold rounded-xl transition bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border border-[#1f2937] hover:border-[var(--color-primary)]">Events</Link>
              <Link to="/auth/view/all/booking" onClick={() => setIsOpen(false)} className="px-4 py-3 text-white/80 font-bold rounded-xl transition bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border border-[#1f2937] hover:border-[var(--color-primary)]">Bookings</Link>
              <Link to="/auth/support" onClick={() => setIsOpen(false)} className="px-4 py-3 text-white/80 font-bold rounded-xl transition bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border border-[#1f2937] hover:border-[var(--color-primary)]">Support</Link>
              <Link to="/auth/my/notification" onClick={() => setIsOpen(false)} className="px-4 py-3 text-white/80 font-bold rounded-xl transition bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border border-[#1f2937] hover:border-[var(--color-primary)]">Notifications</Link>
              <Link to="/auth/profile/1" onClick={() => setIsOpen(false)} className="px-4 py-3 text-white/80 font-bold rounded-xl transition bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border border-[#1f2937] hover:border-[var(--color-primary)]">Profile</Link>
              <Link to="/auth/wishlist" onClick={() => setIsOpen(false)} className="px-4 py-3 text-white/80 font-bold rounded-xl transition bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border border-[#1f2937] hover:border-[var(--color-primary)]">Wishlist</Link>

              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-[#f472b6] font-bold rounded-xl transition bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border border-[#1f2937] hover:border-[var(--color-primary)] hover:bg-[#2D2D35]"
                >
                  Logout
                </button>
              )}

              {!isAuthenticated && (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[#2D2D35]">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-center py-3 text-white font-bold hover:bg-[#2D2D35] rounded-xl transition bg-gradient-to-r from-[#070710] via-[#0c1020] to-[#130c26] border border-[#1f2937]">Login</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="text-center py-3 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] text-white font-bold rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.35)]">Get Ticket</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;