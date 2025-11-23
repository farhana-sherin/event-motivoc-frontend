import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const RecommendedEvents = () => {
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageSize = 3;

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("customer/recommendations/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecommendedEvents(res.data || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, []);

  // Pagination
  const visibleEvents = recommendedEvents.slice(
    currentIndex,
    currentIndex + pageSize
  );

  const handleNext = () => {
    if (currentIndex + pageSize < recommendedEvents.length) {
      setCurrentIndex(currentIndex + pageSize);
    }
  };

  const handlePrev = () => {
    if (currentIndex - pageSize >= 0) {
      setCurrentIndex(currentIndex - pageSize);
    }
  };

  return (
    <section className="w-full bg-white py-12">
      <div className="w-[95%] max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Recommended for You
          </h2>
          {recommendedEvents.length > pageSize && (
            <div className="flex gap-3 items-center">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-3 py-2 rounded-full bg-gray-200 text-gray-700 disabled:opacity-40"
              >
                ⬅
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex + pageSize >= recommendedEvents.length}
                className="px-3 py-2 rounded-full bg-gray-200 text-gray-700 disabled:opacity-40"
              >
                ➡
              </button>
            </div>
          )}
        </div>

        {recommendedEvents.length === 0 ? (
          <p className="text-gray-600">No recommendations available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleEvents.map((event) => (
              <div
                key={event.id}
                className="group rounded-3xl overflow-hidden bg-white ring-1 ring-gray-200/60 shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:ring-gray-300 transition-all duration-300"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={event.images}
                    alt={event.title || "Event"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-sm bg-gradient-to-r from-fuchsia-600 to-indigo-600">
                    {event.price || "Free"}
                  </div>
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-white text-xs font-medium shadow-sm bg-black/50 backdrop-blur">
                    {event.start_date}
                  </div>
                </div>

                <div className="p-6 flex flex-col">
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900 line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {event.short_description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-700">
                    <span
                      className="flex-1 min-w-0 truncate"
                      title={event.location || event.venue}
                    >
                      📍 {event.location || event.venue || "Location TBA"}
                    </span>
                  </div>

                  <div className="mt-5">
                    <Link to={`/auth/event/detail/${event.id}`}>
                      <button className="w-full px-4 py-2.5 rounded-2xl text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 transition-colors">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendedEvents;
