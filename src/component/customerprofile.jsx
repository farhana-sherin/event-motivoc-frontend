import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";
import { Pencil, Mail, Phone, User, Save, X } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 animate-pulse">Loading profile...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] flex items-center justify-center">
        <div className="bg-[#1E1E24] border border-[var(--color-primary)]/50 rounded-3xl p-8 max-w-md text-center">
          <p className="text-[var(--color-primary)] text-lg">{error}</p>
        </div>
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] flex items-center justify-center">
        <div className="bg-[#1E1E24] border border-[#2D2D35] rounded-3xl p-8 max-w-md text-center">
          <p className="text-white/60">No profile data found.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] pt-24 px-6 pb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#0c1020]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#070710]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#130c26]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-[#1E1E24] backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-[#2D2D35] animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#2D2D35]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white">My Profile</h2>
                <p className="text-white/40 text-sm">Manage your account information</p>
              </div>
            </div>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#FF0055] to-[#7000FF] text-white px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all duration-300 font-bold"
                aria-label="Edit profile"
              >
                <Pencil size={18} /> Edit
              </button>
            )}
          </div>

          {/* View Mode */}
          {!editMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0B0C] rounded-2xl p-6 border border-[#2D2D35] hover:border-[var(--color-primary)]/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[var(--color-primary)]/20 rounded-xl flex items-center justify-center">
                    <User className="text-[var(--color-primary)]" size={20} />
                  </div>
                  <p className="text-white/40 text-sm font-medium">Full Name</p>
                </div>
                <p className="text-white font-bold text-xl ml-13">
                  {profile.first_name} {profile.last_name}
                </p>
              </div>

              <div className="bg-[#0B0B0C] rounded-2xl p-6 border border-[#2D2D35] hover:border-[var(--color-accent)]/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[var(--color-accent)]/20 rounded-xl flex items-center justify-center">
                    <User className="text-[var(--color-accent)]" size={20} />
                  </div>
                  <p className="text-white/40 text-sm font-medium">Username</p>
                </div>
                <p className="text-white font-bold text-xl ml-13">
                  {profile.username}
                </p>
              </div>

              <div className="bg-[#0B0B0C] rounded-2xl p-6 border border-[#2D2D35] hover:border-[var(--color-secondary)]/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[var(--color-secondary)]/20 rounded-xl flex items-center justify-center">
                    <Mail className="text-[var(--color-secondary)]" size={20} />
                  </div>
                  <p className="text-white/40 text-sm font-medium">Email</p>
                </div>
                <p className="text-white font-bold text-xl ml-13 break-all">
                  {profile.email}
                </p>
              </div>

              <div className="bg-[#0B0B0C] rounded-2xl p-6 border border-[#2D2D35] hover:border-[var(--color-primary)]/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[var(--color-primary)]/20 rounded-xl flex items-center justify-center">
                    <Phone className="text-[var(--color-primary)]" size={20} />
                  </div>
                  <p className="text-white/40 text-sm font-medium">Phone</p>
                </div>
                <p className="text-white font-bold text-xl ml-13">
                  {profile.phone || "N/A"}
                </p>
              </div>

              <div className="bg-[#0B0B0C] rounded-2xl p-6 border border-[#2D2D35] md:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                  <p className="text-white/40 text-sm font-medium">Role</p>
                </div>
                <p className="text-white font-bold text-xl ml-13 capitalize">
                  {profile.role}
                </p>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/60 text-sm font-bold mb-2">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name || ""}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#2D2D35] rounded-xl text-white placeholder-white/30 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-bold mb-2">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name || ""}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#2D2D35] rounded-xl text-white placeholder-white/30 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-bold mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleChange}
                    placeholder="your_username"
                    className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#2D2D35] rounded-xl text-white placeholder-white/30 focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#2D2D35] rounded-xl text-white placeholder-white/30 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-bold mb-2">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-[#0B0B0C] border border-[#2D2D35] rounded-xl text-white placeholder-white/30 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-bold mb-2">Role (read-only)</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role || profile.role || ""}
                    readOnly
                    className="w-full px-4 py-3 bg-[#2D2D35]/50 border border-[#2D2D35] rounded-xl text-white/40 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:-translate-y-1 transition-all duration-300"
                >
                  <Save size={20} /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setFormData(profile);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#2D2D35] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#3D3D45] transition-all duration-300"
                >
                  <X size={20} /> Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
