import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const SearchEventsPage = () => {
  const { category } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.post(
          "customer/searchby/category/",
          { category: category }
        );
        setEvents(response.data.data || []);
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading events...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Discover{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {category}
          </span>{" "}
          Events
        </h2>

        {events.length === 0 ? (
          <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg">
            <p className="text-gray-600 text-lg">
              No events found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event) => {
              const startDate = new Date(event.start_date);
              const endDate = new Date(event.end_date);

              return (
                <Link
                  key={event.id}
                  to={`/event/detail/${event.id}`}
                  className="group relative bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Event Image */}
                  <div className="relative">
                    <img
                      src={event.images}
                      alt={event.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Floating Date Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg text-center">
                      <p className="text-lg font-bold">
                        {startDate.toLocaleDateString("en-US", { day: "2-digit" })}
                      </p>
                      <p className="text-xs uppercase tracking-wide">
                        {startDate.toLocaleDateString("en-US", { month: "short" })}
                      </p>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6 flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-black  transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                      {startDate.toLocaleDateString()} – {endDate.toLocaleDateString()}
                    </p>

                    <span className="mt-auto inline-block text-center px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow hover:opacity-90 transition duration-300">
                      View Details
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchEventsPage;
