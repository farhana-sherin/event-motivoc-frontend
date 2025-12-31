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
        "/customer/tickets/create/",
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
    <div className="min-h-screen relative overflow-hidden bg-[#0B0B0C] pt-10">
  {/* Background */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-10 right-10 w-72 h-72 bg-[#0B0B0C]/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#0B0B0C]/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#00F0FF]/0 rounded-full blur-3xl animate-pulse"></div>
  </div>

  <div className="relative z-10 py-8 px-4">
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="text-center mb-8">
        

        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 py-10">
          Need <span className="text-[#FF0055]">Help</span>?
        </h1>

        <p className="text-white/60 text-sm max-w-xl mx-auto">
          Submit a support ticket and our team will respond within 24 hours.
        </p>
      </div>

      {/* Card */}
      <div className="bg-[#1E1E24] rounded-2xl shadow-xl p-6 md:p-8 border border-[#2D2D35]">

        {/* Messages */}
        {successMsg && (
          <div className="mb-4 p-3 bg-[#00FF94]/10 border-l-4 border-[#00FF94] rounded-lg text-sm text-[#00FF94]">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 bg-[#FF003C]/10 border-l-4 border-[#FF003C] rounded-lg text-sm text-[#FF003C]">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Subject */}
          <div>
            <label className="block text-xs uppercase text-gray-400 mb-1">
              Subject
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#2D2D35] rounded-lg text-lg text-white"
              placeholder="Brief description of your issue"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs uppercase text-gray-400 mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#2D2D35] rounded-lg text-sm text-white resize-none"
              placeholder="Please provide detailed information..."
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-sm font-bold
              bg-gradient-to-r from-[#FF0055] to-[#7000FF]
              text-white hover:opacity-90 transition"
          >
            {loading ? "Submitting…" : "Submit Ticket"}
          </button>
        </form>

        {/* Footer help */}
        <div className="mt-6 pt-4 border-t border-[#2D2D35] flex gap-3">
          <svg className="w-5 h-5 text-[#00F0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01" />
          </svg>
          <p className="text-white/60 text-xs">
            For urgent issues, add <span className="text-[#FF0055] font-semibold">URGENT</span> in subject.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>

  );
};

export default CreateSupportTicket;
