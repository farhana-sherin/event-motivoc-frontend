import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const EventReviewPage = () => {
  const { id } = useParams(); // event id from URL
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token"); // Get token once

  // Fetch existing reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`customer/event/${id}/ratings/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data.data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      alert("Failed to fetch reviews. Make sure you're logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Please select a rating!");
      return;
    }

    setSubmitting(true);
    try {
      await axiosInstance.post(
        `customer/event/${id}/rate/`,
        { rating, review },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRating(0);
      setReview("");
      fetchReviews(); // Refresh reviews after submission
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Make sure you're logged in.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading reviews...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Rate & Review Event
      </h2>

      {/* Submit Review Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 mb-10"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Your Rating:
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            placeholder="Write your review..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* Display Reviews */}
      <h3 className="text-xl font-semibold mb-4">What others said</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white p-5 rounded-lg shadow flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">
                  {r.user_email || "Anonymous"}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= r.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              {r.review && <p className="text-gray-600">{r.review}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventReviewPage;
