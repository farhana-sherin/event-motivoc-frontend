import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";
import { Pencil, Mail, Phone, User, Save, X, Sparkles, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(`customer/profile/${id}/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.data.status_code === 6000) {
          setProfile(res.data.data);
          setFormData(res.data.data);
        } else {
          setError(res.data.message || "Failed to fetch profile");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.put(
        `customer/profile/update/${id}/`,
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (res.data.status_code === 6000) {
        setProfile(res.data.data);
        setEditMode(false);
        alert("✅ Profile updated successfully");
      } else {
        alert(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#070710] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-[var(--color-primary)]/20 rounded-full"></div>
          </div>
          <p className="text-[var(--color-primary)] font-bold animate-pulse tracking-[0.2em] uppercase text-sm">Loading Identity...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#070710] flex items-center justify-center">
        <div className="bg-[#151518] border border-red-500/20 rounded-[2rem] p-10 max-w-md text-center shadow-[0_0_50px_rgba(239,68,68,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500/5 blur-3xl"></div>
          <p className="text-red-400 text-lg font-medium relative z-10">{error}</p>
        </div>
      </div>
    );

  if (!profile) return null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070710] pt-24 px-4 pb-12 font-sans text-white">

      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-secondary)]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="bg-[#0c1020]/60 backdrop-blur-2xl rounded-[3rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden">

          {/* Header Section */}
          <div className="relative p-8 md:p-12 border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)] transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-[#070710] p-1.5 rounded-lg border border-white/10">
                    <Sparkles size={16} className="text-[var(--color-accent)]" />
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                    My Profile
                  </h2>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] border border-white/5 flex items-center gap-1">
                      <ShieldCheck size={12} /> Verified Customer
                    </span>
                  </div>
                </div>
              </div>

              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="group relative px-6 py-3 bg-[#151518] hover:bg-white text-white hover:text-black rounded-xl border border-white/10 hover:border-white transition-all duration-300 font-bold overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Pencil size={16} /> Edit Profile
                  </span>
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              )}
            </div>
          </div>

          <div className="p-8 md:p-12">
            {!editMode ? (
              /* View Mode */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Name Card */}
                <div className="col-span-1 lg:col-span-2 group bg-[#13131A] rounded-3xl p-6 border border-white/5 hover:border-[var(--color-primary)]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-full blur-2xl group-hover:bg-[var(--color-primary)]/10 transition-all"></div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[var(--color-primary)]/10 rounded-xl text-[var(--color-primary)]">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Full Name</p>
                      <p className="text-2xl font-bold text-white mt-1 group-hover:tracking-wide transition-all duration-300">
                        {profile.first_name} {profile.last_name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Username Card */}
                <div className="bg-[#13131A] rounded-3xl p-6 border border-white/5 hover:border-[var(--color-accent)]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-[var(--color-accent)]/10 rounded-xl text-[var(--color-accent)]">
                      <User size={20} />
                    </div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Username</p>
                  </div>
                  <p className="text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                    @{profile.username}
                  </p>
                </div>

                {/* Email Card */}
                <div className="bg-[#13131A] rounded-3xl p-6 border border-white/5 hover:border-[var(--color-secondary)]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-[var(--color-secondary)]/10 rounded-xl text-[var(--color-secondary)]">
                      <Mail size={20} />
                    </div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Email</p>
                  </div>
                  <p className="text-lg font-bold text-white break-all group-hover:text-[var(--color-secondary)] transition-colors">
                    {profile.email}
                  </p>
                </div>

                {/* Phone Card */}
                <div className="bg-[#13131A] rounded-3xl p-6 border border-white/5 hover:border-[var(--color-primary)]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-[var(--color-primary)]/10 rounded-xl text-[var(--color-primary)]">
                      <Phone size={20} />
                    </div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Phone</p>
                  </div>
                  <p className="text-xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">
                    {profile.phone || "Not Set"}
                  </p>
                </div>

                {/* Role Card */}
                <div className="lg:col-span-1 bg-gradient-to-br from-[#13131A] to-[#0c1020] rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Account Type</p>
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 capitalize">
                      {profile.role}
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleUpdate} className="space-y-8 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest ml-1">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name || ""}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-[#0B0B0C] border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-widest ml-1">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name || ""}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-[#0B0B0C] border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-widest ml-1">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username || ""}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-[#0B0B0C] border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)] outline-none transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest ml-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-[#0B0B0C] border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all font-medium"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email (Read Only)</label>
                    <input
                      type="email"
                      value={formData.email || ""}
                      disabled
                      className="w-full px-6 py-4 bg-[#0B0B0C]/50 border border-white/5 rounded-2xl text-white/50 cursor-not-allowed font-medium"
                    />
                  </div>

                </div>

                <div className="flex gap-4 pt-6 border-t border-white/5">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Save size={20} /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setFormData(profile);
                    }}
                    className="flex-1 px-8 py-4 bg-[#1F1F23] text-white font-bold rounded-2xl hover:bg-[#2D2D35] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <X size={20} /> Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
