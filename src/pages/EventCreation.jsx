import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";

const EventCreation = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    title: "",
    date: "",
    category: "",
    price: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("organizer/event/list/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status_code === 6000) {
        setEvents(res.data.data);
        console.log(res.data.data)
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update event
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (isEditing) {
        await axiosInstance.put(
          `organizer/event//update/${form.id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axiosInstance.post("organizer/event/create", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      fetchEvents();
      resetForm();
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`organizer/event//delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event.id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  // Edit mode
  const handleEdit = (event) => {
    setForm(event);
    setIsEditing(true);
  };

  // Reset form
  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      date: "",
      category: "",
      price: "",
      description: "",
    });
    setIsEditing(false);
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="w-[95%] max-w-6xl mx-auto py-10 text-white">
      <h2 className="text-3xl font-bold mb-6">Manage My Events</h2>

      {/* Event Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#0c1030] p-6 rounded-xl border border-indigo-700 mb-10"
      >
        <h3 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Event" : "Create New Event"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
            className="p-2 rounded bg-[#1a1f4a] text-white border border-indigo-700"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="p-2 rounded bg-[#1a1f4a] text-white border border-indigo-700"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="p-2 rounded bg-[#1a1f4a] text-white border border-indigo-700"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Ticket Price"
            className="p-2 rounded bg-[#1a1f4a] text-white border border-indigo-700"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="w-full p-2 mt-4 rounded bg-[#1a1f4a] text-white border border-indigo-700"
        />

        <div className="mt-4 flex gap-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
          >
            {isEditing ? "Update Event" : "Create Event"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-[#0c1030] border border-indigo-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-gray-300 text-sm mb-1">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-300 text-sm mb-1">
              Category: {event.category}
            </p>
            <p className="text-gray-300 text-sm mb-1">
              Price: ₹{event.price}
            </p>
            <p className="text-gray-400 text-sm mb-3">{event.description}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(event)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCreation;
