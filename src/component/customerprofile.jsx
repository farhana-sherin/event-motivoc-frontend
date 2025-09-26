import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(`customer/profile/${id}/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.data.status_code === 6000) {
          setProfile(res.data.data);
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
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

  const { role, email, username, first_name, last_name, phone, customer, organizer, admin } = profile;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Profile
      </h2>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <span className="font-semibold">Role: </span>
          <span className="text-gray-700 capitalize">{role}</span>
        </div>

        <div>
          <span className="font-semibold">Name: </span>
          <span className="text-gray-700">{first_name} {last_name}</span>
        </div>

        <div>
          <span className="font-semibold">Username: </span>
          <span className="text-gray-700">{username}</span>
        </div>

        <div>
          <span className="font-semibold">Email: </span>
          <span className="text-gray-700">{email}</span>
        </div>

        <div>
          <span className="font-semibold">Phone: </span>
          <span className="text-gray-700">{phone || "N/A"}</span>
        </div>

        {/* Extra info for roles */}
        {role === "admin" && admin && (
          <div>
            <span className="font-semibold">Admin ID: </span>
            <span className="text-gray-700">{admin.id}</span>
          </div>
        )}
        {role === "organizer" && organizer && (
          <div>
            <span className="font-semibold">Organizer ID: </span>
            <span className="text-gray-700">{organizer.id}</span>
          </div>
        )}
        {role === "customer" && customer && (
          <div>
            <span className="font-semibold">Customer ID: </span>
            <span className="text-gray-700">{customer.id}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
