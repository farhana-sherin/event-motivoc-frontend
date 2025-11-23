import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosinstance"; // adjust path if needed

const BecomeOrganizerPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "customer/become/organizer/",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status_code === 6000) {
        // Just became organizer
        alert("You are now an Organizer!");
      }

     
      navigate("/auth/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to become an organizer");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1030]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-24 px-6">
        <div className="w-[95%] max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 border border-white/30 mb-8">
            <span className="text-2xl">🚀</span>
            <span className="font-semibold text-sm uppercase tracking-wider">Join Our Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Become an Event Organizer
          </h1>
          
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            Create, manage, and promote amazing events with our comprehensive platform. 
            Join thousands of successful organizers who trust us to bring their vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              join now
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white/5">
        <div className="w-[95%] max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Getting started is easy. Follow these simple steps to create your first event.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-indigo-500/20 hover:bg-white/10 transition-all duration-300 group text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📅</div>
              <h3 className="text-xl font-bold text-white mb-3">Post an Event</h3>
              <p className="text-gray-300 leading-relaxed">
                Add event details like date, time, and location with our intuitive event builder.
              </p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-indigo-500/20 hover:bg-white/10 transition-all duration-300 group text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🤝</div>
              <h3 className="text-xl font-bold text-white mb-3">Invite People</h3>
              <p className="text-gray-300 leading-relaxed">
                Share your event with friends, groups, or the public using our marketing tools.
              </p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-indigo-500/20 hover:bg-white/10 transition-all duration-300 group text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💰</div>
              <h3 className="text-xl font-bold text-white mb-3">Get Contributions</h3>
              <p className="text-gray-300 leading-relaxed">
                Attendees can easily contribute and pay online with secure payment processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <div className="w-[95%] max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Become an Organizer?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join now and start creating unforgettable events today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              join now
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
              Contact Sales
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold mb-1">1000+</div>
              <div className="text-sm text-indigo-200">Active Organizers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-sm text-indigo-200">Events Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">2M+</div>
              <div className="text-sm text-indigo-200">Tickets Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">99%</div>
              <div className="text-sm text-indigo-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeOrganizerPage;
