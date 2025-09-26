import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import OrganizerLayout from "./OrganizerLayout";

const OrganizerEventRatings = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token
        const res = await axios.get(
          "http://127.0.0.1:8000/api/v1/organizer/event/ratings/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.status_code === 6000) {
          setEvents(res.data.data);
        } else {
          console.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.round(rating) ? (
          <FaStar key={i} className="text-yellow-500 inline-block" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 inline-block" />
        )
      );
    }
    return stars;
  };

  const content = () => {
    if (loading) {
      return (
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-gray-600 font-medium">Loading ratings...</span>
            </div>
          </div>
        </div>
      );
    }

    if (events.length === 0) {
      return (
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">No events or ratings found.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Ratings</h1>
          <p className="text-gray-600">View and manage ratings for your events.</p>
        </div>

        {/* Ratings Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.event_id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{event.title}</h2>
              
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-blue-600 mr-3">{event.avg_rating.toFixed(1)}</span>
                <div className="flex">{renderStars(event.avg_rating)}</div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Total Ratings</span>
                <span className="font-semibold text-gray-900">{event.total_ratings}</span>
              </div>

              {event.reviews.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold mb-3 text-gray-900">Recent Reviews:</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {event.reviews.slice(0, 3).map((review, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{review.user__email}</span>
                          <div className="flex">{renderStars(review.rating)}</div>
                        </div>
                        {review.review && (
                          <p className="text-gray-600 text-sm">{review.review}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <OrganizerLayout>
      {content()}
    </OrganizerLayout>
  );
};

export default OrganizerEventRatings;
