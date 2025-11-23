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

  // Accept event when used as form onSubmit
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
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
      </div>
    );

  if (!profile)
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No profile data found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-6 mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">My Profile</h2>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
              aria-label="Edit profile"
            >
              <Pencil size={18} /> Edit
            </button>
          )}
        </div>

        {/* View mode */}
        {!editMode ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-white shadow-sm flex items-center gap-3">
              <User className="text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-900">
                  {profile.first_name} {profile.last_name}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-white shadow-sm flex items-center gap-3">
              <User className="text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="text-lg font-semibold text-gray-900">
                  {profile.username}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-white shadow-sm flex items-center gap-3">
              <Mail className="text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-900">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-white shadow-sm flex items-center gap-3">
              <Phone className="text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-lg font-semibold text-gray-900">
                  {profile.phone || "N/A"}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-white shadow-sm flex items-center gap-3 col-span-1 sm:col-span-2">
              <User className="text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {profile.role}
                </p>
              </div>
            </div>
          </div>
        ) : (
          // EDIT MODE — labels + placeholders (form)
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">First name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name || ""}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Last name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name || ""}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username || ""}
                  onChange={handleChange}
                  placeholder="your_username"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Role (read-only)</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role || profile.role || ""}
                  readOnly
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-green-700 transition"
              >
                <Save size={18} /> Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData(profile); // revert changes
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-400 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-gray-500 transition"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
