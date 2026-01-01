import React, { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosinstance";

const TicketSupport = () => {
  const [view, setView] = useState("list"); // 'list', 'create', 'detail'
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Create Ticket State
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Reply State
  const [replyMessage, setReplyMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (view === "list") {
      fetchTickets();
    }
  }, [view]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("customer/tickets/my/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axiosInstance.post(
        "customer/tickets/create/",
        { subject, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMsg("Ticket created successfully!");
      setSubject("");
      setMessage("");
      setTimeout(() => setView("list"), 1500);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error creating ticket");
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyMessage) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `customer/tickets/${selectedTicket.id}/reply/`,
        { message: replyMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Add new reply to local state
      const newReply = res.data;
      setSelectedTicket(prev => ({
        ...prev,
        replies: [...(prev.replies || []), newReply]
      }));
      setReplyMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] pt-24 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#FF0055]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#7000FF]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto pb-12">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
            Support <span className="text-[var(--color-primary)]">Center</span>
          </h1>
          <p className="text-sm sm:text-base text-white/60 px-4">Manage your support requests and view responses.</p>
        </div>

        {/* Views */}
        {view === "list" && (
          <div className="bg-[#1E1E24] rounded-3xl p-6 border border-[#2D2D35] animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">My Tickets</h2>
              <button
                onClick={() => setView("create")}
                className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 transition"
              >
                + New Ticket
              </button>
            </div>

            {loading ? (
              <div className="text-center text-white/50 py-10">Loading tickets...</div>
            ) : tickets.length === 0 ? (
              <div className="text-center text-white/50 py-10">No tickets found. Create one to get started.</div>
            ) : (
              <div className="space-y-4">
                {tickets.map(ticket => (
                  <div
                    key={ticket.id}
                    onClick={() => { setSelectedTicket(ticket); setView("detail"); }}
                    className="bg-[#0B0B0C] p-4 rounded-xl border border-[#2D2D35] hover:border-[var(--color-primary)] cursor-pointer transition-all flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[var(--color-primary)] font-bold text-lg leading-none">#{ticket.id}</span>
                        <h3 className="text-white font-semibold text-lg leading-none">{ticket.subject}</h3>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-800 border border-white/10 ${ticket.status === 'RESOLVED' ? 'text-green-400' : 'text-blue-400'}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm sm:text-base line-clamp-1">{ticket.message}</p>
                    </div>
                    <div className="text-left sm:text-right border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                      <p className="text-white/40 text-[10px] sm:text-xs">Created: {new Date(ticket.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "create" && (
          <div className="bg-[#1E1E24] rounded-3xl p-6 border border-[#2D2D35] max-w-2xl mx-auto animate-fade-in-up">
            <button onClick={() => setView("list")} className="text-white/60 hover:text-white mb-4 flex items-center gap-2">
              &larr; Back to Tickets
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Create New Ticket</h2>

            {successMsg && <div className="bg-green-500/10 text-green-500 p-3 rounded-xl mb-4">{successMsg}</div>}
            {errorMsg && <div className="bg-red-500/10 text-red-500 p-3 rounded-xl mb-4">{errorMsg}</div>}

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="text-white text-sm font-bold block mb-2">Subject</label>
                <input
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full bg-[#0B0B0C] border border-[#2D2D35] text-white p-3 rounded-xl focus:border-[var(--color-primary)] outline-none"
                  placeholder="Issue summary"
                />
              </div>
              <div>
                <label className="text-white text-sm font-bold block mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={5}
                  className="w-full bg-[#0B0B0C] border border-[#2D2D35] text-white p-3 rounded-xl focus:border-[var(--color-accent)] outline-none resize-none"
                  placeholder="Describe your issue..."
                />
              </div>
              <button disabled={loading} className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white py-3 rounded-xl font-bold">
                {loading ? "Submitting..." : "Submit Ticket"}
              </button>
            </form>
          </div>
        )}

        {view === "detail" && selectedTicket && (
          <div className="bg-[#1E1E24] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#2D2D35] h-[85vh] sm:h-[80vh] flex flex-col animate-fade-in-up">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#2D2D35]">
              <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                <button onClick={() => setView("list")} className="text-white/60 hover:text-white flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-white truncate">{selectedTicket.subject}</h2>
                  <span className="text-[10px] sm:text-xs text-[var(--color-primary)]">#{selectedTicket.id}</span>
                </div>
              </div>
              <span className={`flex-shrink-0 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold ${selectedTicket.status === 'RESOLVED' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
                {selectedTicket.status}
              </span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto space-y-4 p-2 custom-scrollbar">
              {/* Original Message */}
              <div className="flex justify-end">
                <div className="bg-[var(--color-primary)]/20 text-white p-3 sm:p-4 rounded-2xl rounded-tr-none max-w-[90%] sm:max-w-[80%]">
                  <p className="text-sm sm:text-lg whitespace-pre-wrap">{selectedTicket.message}</p>
                  <p className="text-[10px] text-white/40 mt-2 text-right">{new Date(selectedTicket.created_at).toLocaleString()}</p>
                </div>
              </div>

              {/* Replies */}
              {selectedTicket.replies?.map((reply) => {
                const isMe = reply.sender_role !== "Admin";
                return (
                  <div key={reply.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 sm:p-4 rounded-2xl max-w-[90%] sm:max-w-[80%] ${isMe ? 'bg-[var(--color-primary)]/20 text-white rounded-tr-none' : 'bg-[var(--color-accent)]/20 text-white rounded-tl-none border border-white/5'}`}>
                      {!isMe && <p className="text-[var(--color-accent)] text-xs sm:text-sm font-black uppercase tracking-widest mb-1.5 opacity-80">Support Team</p>}
                      <p className="text-sm sm:text-lg whitespace-pre-wrap">{reply.message}</p>
                      <p className="text-[10px] text-white/40 mt-2 text-right">{new Date(reply.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Input */}
            <div className="mt-4 pt-4 border-t border-[#2D2D35]">
              <form onSubmit={handleReplySubmit} className="flex gap-2">
                <input
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="flex-1 bg-[#0B0B0C] border border-[#2D2D35] text-white text-sm sm:text-base p-3 rounded-xl focus:border-[var(--color-secondary)] outline-none transition-colors"
                  placeholder="Type your reply..."
                />
                <button
                  disabled={loading || !replyMessage.trim()}
                  className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-4 sm:px-6 py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition-all duration-300 transform active:scale-95"
                >
                  <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketSupport;
