import React, { useState } from "react";
import { axiosInstance } from "../config/axiosinstance";

const CreateSupportTicket = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!subject || !message) {
      setErrorMsg("Subject and message are required.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "customer/support-ticket/create/",
        { subject, message },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      setSuccessMsg(res.data.message || "Ticket created successfully!");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create Support Ticket
        </h2>

        {successMsg && (
          <p className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center">
            {successMsg}
          </p>
        )}
        {errorMsg && (
          <p className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 text-center">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter ticket subject"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message"
              rows={5}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSupportTicket;
