import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const darkMode = !isHome || isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const categories = ["Music", "Tech", "Sports", "Arts", "Culinary", "Business","other"];
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

  // ✅ navigate to search page dynamically
  const handleSubmitSearch = () => {
    if (search.trim()) {
      navigate(`/search/${search.toLowerCase()}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div>
      <section className="sticky top-0 z-50 relative pt-2">
        <div className="w-[95%] mx-auto">
          {/* Navbar */}
          <section
            className={`flex flex-wrap justify-between items-center px-4 md:px-8 py-3 h-[60px] w-full rounded-3xl transition-colors duration-300 ${
              darkMode || isOpen
                ? "bg-[#0c1030]/95 border border-indigo-900/40 backdrop-blur-md shadow-lg"
                : "bg-white/15 border border-white/30 backdrop-blur-md shadow-lg"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center gap-2 select-none">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md flex items-center justify-center ring-1 ring-white/30">
                <span className="font-bold">M</span>
              </div>
              <h1
                className={`${
                  darkMode || isOpen ? "text-white" : "text-white"
                } text-2xl font-extrabold tracking-tight`}
              >
                Motivoc
              </h1>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:block">
              <ul
                className={`flex gap-8 font-medium ${
                  darkMode ? "text-white/90" : "text-white"
                }`}
              >
                <Link to="/"><li className="px-4 py-1 text-lg rounded-3xl hover:bg-white/20">Home</li></Link>
                <Link to="/about"><li className="px-4 py-1 text-lg rounded-3xl hover:bg-white/20">About</li></Link>
                <Link to="/contact"><li className="px-4 py-1 text-lg rounded-3xl hover:bg-white/20">Contact</li></Link>
                <Link to="/event/list"><li className="px-4 py-1 text-lg rounded-3xl hover:bg-white/20">Events</li></Link>
                <Link to="/view/all/booking"><li className="px-4 py-1 text-lg rounded-3xl hover:bg-white/20">my_bookings</li></Link>
                <Link to="/notification"><li className="px-4 py-1 text-lg rounded-3xl hover:bg-white/20">Not</li></Link>


              </ul>
            </div>

            {/* Desktop Search + Register */}
            <div className="hidden lg:flex items-center gap-3 relative">
              <div
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-white/90 transition-colors duration-300 ${
                  darkMode
                    ? "bg-white/10 border border-white/25 text-white"
                    : "bg-white/10 border border-white/25 text-gray-900"
                }`}
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search categories..."
                  className="bg-transparent placeholder-white/70 text-inherit text-sm outline-none w-32 focus:w-48 transition-all"
                />

                {/* ✅ Search Button now works dynamically */}
                <button
                  onClick={handleSubmitSearch}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm"
                >
                  Search
                </button>

                {showSuggestions && filtered.length > 0 && (
                  <ul className="absolute top-12 left-0 w-56 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden z-40">
                    {filtered.map((item, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelect(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300">
                Register
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                className={`inline-flex items-center justify-center h-10 w-10 rounded-xl border transition ${
                  darkMode || isOpen
                    ? "bg-[#0c1030]/90 text-white border-indigo-900/40"
                    : "bg-white/20 text-gray-900 border-white/30"
                }`}
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {isOpen ? "✖" : "☰"}
              </button>
            </div>
          </section>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="lg:hidden mt-2 px-4">
              <div
                className={`rounded-2xl backdrop-blur-md border shadow-lg p-2 transition-colors duration-300 ${
                  darkMode
                    ? "bg-[#0c1030]/95 border-indigo-900/40 text-white"
                    : "bg-[#0c1030]/90 text-white border-indigo-900/40"
                }`}
              >
                {/* Search */}
                <div className="mb-4">
                  <div
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors duration-300 ${
                      darkMode
                        ? "bg-white/10 border border-white/25 text-white"
                        : "bg-white/50 border border-gray-200 text-gray-900"
                    }`}
                  >
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Search categories..."
                      className="bg-transparent outline-none flex-1 placeholder-white/70 text-inherit"
                    />
                    <button
                      onClick={() => {
                        handleSubmitSearch();
                        setIsOpen(false);
                      }}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm"
                    >
                      Search
                    </button>
                  </div>
                  {showSuggestions && filtered.length > 0 && (
                    <ul className="mt-2 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden">
                      {filtered.map((item, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelect(item)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Mobile Links */}
                <ul className="flex flex-col gap-2 font-medium">
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <li className="px-4 py-2 rounded-xl hover:bg-white/20">Home</li>
                  </Link>
                  <Link to="/about" onClick={() => setIsOpen(false)}>
                    <li className="px-4 py-2 rounded-xl hover:bg-white/20">About</li>
                  </Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <li className="px-4 py-2 rounded-xl hover:bg-white/20">Contact</li>
                  </Link>
                  <Link to="/events" onClick={() => setIsOpen(false)}>
                    <li className="px-4 py-2 rounded-xl hover:bg-white/20">Events</li>
                  </Link>
                  <button className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md">
                    Register
                  </button>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Header;
