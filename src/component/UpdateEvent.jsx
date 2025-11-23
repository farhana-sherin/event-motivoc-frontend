import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    short_description: "",
    description: "",
    category: "OTHER",
    location: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    price: "", // will be string with 2 decimals
    ticket_count: 1,
    image: null,
  });

  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch event details
  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        `organizer/events/detail/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status_code === 6000) {
        const e = response.data.data;
        setForm({
          title: e.title || "",
          short_description: e.short_description || "",
          description: e.description || "",
          category: e.category || "OTHER",
          location: e.location || "",
          start_date: e.start_date || "",
          start_time: e.start_time || "",
          end_date: e.end_date || "",
          end_time: e.end_time || "",
          price: e.price !== null ? Number(e.price).toFixed(2) : "", // ✅ keep 2 decimals
          ticket_count: e.ticket_count || 1,
          image: null,
        });
        setCurrentImage(e.images || null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch event details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else if (name === "price") {
      setForm({ ...form, price: value }); // keep as string, will format on submit
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      for (const key in form) {
        if (key === "image") {
          if (form.image) formData.append("images", form.image);
        } else if (key === "price") {
          formData.append("price", Number(form.price).toFixed(2)); // ✅ send with 2 decimals
        } else {
          formData.append(key, form[key]);
        }
      }

      const response = await axiosInstance.patch(
        `organizer/event/update/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status_code === 6000) {
        alert("Event updated successfully!");
        navigate("/auth/OrganizerEventList");
      } else {
        setError(response.data.message || "Failed to update event");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center text-white mt-10">Loading event details...</p>;

  return (
    <div className="w-[95%] max-w-3xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-700 text-center">Update Event</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-1 font-semibold">Short Description</label>
          <input
            type="text"
            name="short_description"
            value={form.short_description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows={4}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="MUSIC">Music</option>
            <option value="SPORTS">Sports</option>
            <option value="TECH">Tech</option>
            <option value="ARTS">Arts</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Dates & Times */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Start Time</label>
            <input
              type="time"
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">End Date</label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">End Time</label>
            <input
              type="time"
              name="end_time"
              value={form.end_time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* Price & Tickets */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Tickets Count</label>
            <input
              type="number"
              name="ticket_count"
              value={form.ticket_count}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              min={1}
              required
            />
          </div>
        </div>

        {/* Existing Image */}
        {currentImage && !form.image && (
          <img
            src={currentImage}
            alt="Current Event"
            className="w-full h-64 object-cover mb-2 rounded"
          />
        )}

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-semibold">Event Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload a new image to replace the current one.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600 transition"
        >
          {submitting ? "Updating..." : "Update Event"}
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
