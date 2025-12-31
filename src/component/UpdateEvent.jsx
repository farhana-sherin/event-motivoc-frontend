import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const UpdateEvent = () => {
  const { id } = useParams();
  console.log("Event ID from URL:", id); // Debug log
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

  // Debug: Monitor form state changes
  useEffect(() => {
    console.log("Form state updated:", form);
  }, [form]);

  // Fetch event details
  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        `organizer/events/detail/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Event Detail API Response:", response.data); // Debug log

      if (response.data.status_code === 6000) {
        const e = response.data.data;
        console.log("Event Data:", e); // Debug log
        
        // Log each field individually to see what's available
        console.log("Title:", e.title);
        console.log("Short Description:", e.short_description);
        console.log("Description:", e.description);
        console.log("Category:", e.category);
        console.log("Location:", e.location);
        console.log("Start Date:", e.start_date);
        console.log("Start Time:", e.start_time);
        console.log("End Date:", e.end_date);
        console.log("End Time:", e.end_time);
        console.log("Price:", e.price);
        console.log("Ticket Count:", e.ticket_count);
        console.log("Images:", e.images);
        
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
        console.log("Form state after setting:", {
          title: e.title || "",
          short_description: e.short_description || "",
          description: e.description || "",
          category: e.category || "OTHER",
          location: e.location || "",
          start_date: e.start_date || "",
          start_time: e.start_time || "",
          end_date: e.end_date || "",
          end_time: e.end_time || "",
          price: e.price !== null ? Number(e.price).toFixed(2) : "",
          ticket_count: e.ticket_count || 1,
        }); // Debug log
        setCurrentImage(e.images || null);
      } else {
        console.log("API returned non-success status:", response.data.status_code);
        setError("Failed to fetch event details: " + (response.data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Fetch Event Error:", err); // Debug log
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
      console.log("Price changed to:", value); // Debug log
      setForm({ ...form, price: value }); // keep as string, will format on submit
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Debug: Log form state in render
  console.log("Rendering with form state:", form);

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
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="flex justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );

  return (
    <>
      <div className="w-[95%] max-w-4xl mx-auto py-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Update Event
          </h2>
          <p className="text-gray-600 mt-2">
            Modify the details of your event
          </p>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <form
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Event Basic Info */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Information</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900"
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Short Description</label>
                <input
                  type="text"
                  name="short_description"
                  value={form.short_description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900"
                  placeholder="Brief description of your event"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Full Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900"
                  rows={4}
                  placeholder="Detailed description of your event"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900 bg-white"
                >
                  <option value="MUSIC">Music</option>
                  <option value="SPORTS">Sports</option>
                  <option value="TECH">Technology</option>
                  <option value="ARTS">Arts & Culture</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FOOD">Food & Drink</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900"
                  placeholder="Event venue or address"
                  required
                />
              </div>
            </div>
          </div>

          {/* Event Timing */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Timing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  name="start_time"
                  value={form.start_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  name="end_time"
                  value={form.end_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Tickets */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing & Tickets</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Ticket Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Total Tickets Available</label>
                <input
                  type="number"
                  name="ticket_count"
                  value={form.ticket_count}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Media</h3>
            
            {/* Existing Image */}
            {currentImage && !form.image && (
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">Current Image</label>
                <div className="flex items-center justify-center w-full">
                  <img
                    src={currentImage}
                    alt="Current Event"
                    className="w-full h-64 object-cover rounded-xl border border-gray-200"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Event Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    onChange={handleChange} 
                    className="hidden" 
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Upload a new image to replace the current one.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateEvent;
