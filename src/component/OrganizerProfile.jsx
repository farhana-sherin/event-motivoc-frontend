import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import { Mail, Phone, User, X, Camera, Check, Edit3, Building2, LayoutDashboard } from "lucide-react";

const OrganizerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const res = await axiosInstance.get("organizer/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.status_code === 6000) {
          const data = res.data.data;
          setProfile(data);
          setFormData({
            first_name: data.user?.first_name || "",
            last_name: data.user?.last_name || "",
            username: data.user?.username || "",
            email: data.user?.email || "",
            phone: data.user?.phone || "",
          });
        } else {
          setError(res.data.message || "Failed to fetch profile");
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
        "organizer/profile/update/",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse tracking-widest uppercase text-sm">Loading Profile...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-2xl shadow-red-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="text-red-500 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Profile</h3>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-6 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Header Breadcrumb or Title */}
        <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
          <LayoutDashboard size={16} />
          <span>/</span>
          <span>Account Settings</span>
          <span>/</span>
          <span className="font-semibold text-indigo-600">Profile</span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">

          {/* Cover Area */}
          <div className="h-48 bg-gradient-to-r from-indigo-50 to-blue-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="px-8 md:px-12 pb-12 relative">
            {/* Header Content with Overlapping Avatar */}
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-12 gap-6 md:gap-8">

              <div className="relative group/avatar">
                <div className="h-32 w-32 rounded-[2rem] bg-white p-2 shadow-xl ring-4 ring-white/50">
                  <div className="h-full w-full rounded-[1.5rem] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-300 border border-gray-100">
                    <User size={48} className="text-indigo-600" />
                  </div>
                </div>
                {!editMode && (
                  <button className="absolute bottom-[-5px] right-[-5px] p-2.5 rounded-xl bg-white text-indigo-600 shadow-lg border border-gray-100 hover:bg-indigo-50 transition-colors">
                    <Camera size={18} />
                  </button>
                )}
              </div>

              <div className="flex-1 text-center md:text-left mb-2 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
                  {profile?.user?.first_name || "Organizer"} {profile?.user?.last_name}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium">
                  <span className="text-indigo-600">@</span>{profile?.user?.username}
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="flex items-center gap-1 text-xs uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-bold">
                    Organizer
                  </span>
                </div>
              </div>

              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-lg shadow-gray-200 hover:bg-black hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Edit3 size={18} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {/* Form Section */}
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">

                {/* ID Card Style Section */}
                <div className="md:col-span-2 mb-4">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-gray-300"></span>
                    Personal Information
                  </h3>
                </div>

                {/* First Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">First Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`w-full px-5 py-4 rounded-xl bg-gray-50 border-2 ${editMode ? 'border-gray-200 focus:border-indigo-600 focus:bg-white' : 'border-transparent'} text-gray-900 font-medium transition-all duration-200 outline-none`}
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Last Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`w-full px-5 py-4 rounded-xl bg-gray-50 border-2 ${editMode ? 'border-gray-200 focus:border-indigo-600 focus:bg-white' : 'border-transparent'} text-gray-900 font-medium transition-all duration-200 outline-none`}
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Username</label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`w-full pl-12 pr-5 py-4 rounded-xl bg-gray-50 border-2 ${editMode ? 'border-gray-200 focus:border-indigo-600 focus:bg-white' : 'border-transparent'} text-gray-900 font-medium transition-all duration-200 outline-none`}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                      <Phone size={18} />
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`w-full pl-12 pr-5 py-4 rounded-xl bg-gray-50 border-2 ${editMode ? 'border-gray-200 focus:border-indigo-600 focus:bg-white' : 'border-transparent'} text-gray-900 font-medium transition-all duration-200 outline-none`}
                    />
                  </div>
                </div>

                {/* Email - Full Width */}
                <div className="md:col-span-2 group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full pl-12 pr-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent text-gray-500 font-medium cursor-not-allowed"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-200 rounded text-xs font-bold text-gray-500">
                      LOCKED
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              {editMode && (
                <div className="flex items-center justify-end gap-4 mt-12 pt-8 border-t border-gray-100 animate-fade-in-up">
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setFormData({
                        first_name: profile?.user?.first_name || "",
                        last_name: profile?.user?.last_name || "",
                        username: profile?.user?.username || "",
                        email: profile?.user?.email || "",
                        phone: profile?.user?.phone || "",
                      });
                    }}
                    className="px-6 py-3 rounded-xl text-gray-600 font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
                  >
                    <X size={20} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                  >
                    <Check size={20} />
                    Save Changes
                  </button>
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;
