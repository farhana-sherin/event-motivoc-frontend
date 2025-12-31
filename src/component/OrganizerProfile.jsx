import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";
import { Mail, Phone, User, X, Camera, Check, Edit3 } from "lucide-react";

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

        console.log("Profile API Response:", res.data); // Debug log

        if (res.data.status_code === 6000) {
          const data = res.data.data;
          console.log("Profile Data:", data); // Debug log
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
        console.error("Profile Fetch Error:", err); // Debug log
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
      <div className="flex justify-center items-center h-[70vh] bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[70vh] bg-gray-50">
        <div className="text-red-500 bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm">
                <User size={28} className="text-indigo-600" />
              </div>
              <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm">
                <Camera size={12} className="text-indigo-600" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {profile?.user?.first_name || "Organizer"} {profile?.user?.last_name}
              </h2>
              <p className="text-sm text-indigo-600">@{profile?.user?.username}</p>
            </div>
          </div>

          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <Edit3 size={16} />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="mt-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block font-medium">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full mt-1 px-4 py-3 rounded-xl border text-sm ${
                  editMode
                    ? "bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block font-medium">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full mt-1 px-4 py-3 rounded-xl border text-sm ${
                  editMode
                    ? "bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              />
            </div>

            {/* Username */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full mt-1 px-4 py-3 rounded-xl border text-sm ${
                  editMode
                    ? "bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-gray-50 border-gray-200 text-gray-500 text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full mt-1 px-4 py-3 rounded-xl border text-sm ${
                  editMode
                    ? "bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              />
            </div>
          </div>

          {/* Actions */}
          {editMode && (
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
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
                className="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-900 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 border border-gray-300 shadow-sm"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <Check size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OrganizerProfile;