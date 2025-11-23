import React, { useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import { useNavigate } from "react-router-dom";
import OrganizerLayout from "./OrganizerLayout"; // make sure the path is correct

const CreateEvent = () => {
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
    price: "",
    ticket_count: 1,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const token = localStorage.getItem("token");
  
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("short_description", form.short_description);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("location", form.location);
      formData.append("start_date", form.start_date);
      formData.append("start_time", form.start_time);
      formData.append("end_date", form.end_date);
      formData.append("end_time", form.end_time);
  
      // ✅ Convert price to fixed 2 decimal string
      formData.append("price", Number(form.price).toFixed(2));
      formData.append("ticket_count", form.ticket_count);
  
      // ✅ Ensure correct field name for backend
      if (form.image) formData.append("images", form.image);
  
      const response = await axiosInstance.post(
        "organizer/event/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.status_code === 6000) {
        alert("Event created successfully!");
        navigate("/auth/OrganizerEventList");
      } else {
        setError(response.data.message || "Failed to create event");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <OrganizerLayout>
      <div className="w-[95%] max-w-3xl mx-auto py-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-700 text-center">
          Create New Event
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
          onSubmit={handleSubmit}
        >
          {/* Form fields remain the same */}
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

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows={4}
              required
            ></textarea>
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
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
                required
                min={1}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Event Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600 transition"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </OrganizerLayout>
  );
};

export default CreateEvent;
