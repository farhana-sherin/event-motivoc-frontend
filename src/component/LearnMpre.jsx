import React from "react";
import { useNavigate } from "react-router-dom";

const LearnMorePage = () => {
    const navigate = useNavigate();
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26] text-white py-20 px-4 overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0c1020]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#130c26]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#070710]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Learn More About Becoming an Organizer
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Our platform empowers organizers to create and manage events easily. Whether planning concerts, conferences, or festivals, we provide all the tools you need to succeed.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { title: "Easy Event Creation", desc: "Plan and launch events quickly with intuitive tools.", color: "from-indigo-500 to-purple-500" },
            { title: "Secure Payments", desc: "Safe and fast payment system for organizers and attendees.", color: "from-pink-500 to-red-500" },
            { title: "Analytics & Reports", desc: "Track ticket sales and attendee engagement in real-time.", color: "from-green-400 to-blue-400" },
            { title: "Promotional Tools", desc: "Reach a larger audience with built-in marketing tools.", color: "from-yellow-400 to-orange-400" },
          ].map((benefit, index) => (
            <div key={index} className="relative p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-indigo-500/20 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className={`w-12 h-12 mb-4 rounded-full bg-gradient-to-tr ${benefit.color} flex items-center justify-center text-white text-lg font-bold`}>
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-300 text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block bg-white/5 backdrop-blur-xl rounded-3xl p-10 md:p-14 border border-indigo-500/20 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of organizers creating unforgettable experiences. Click below to begin your journey and start hosting amazing events.
            </p>
            <button className="px-10 py-4 bg-gradient-to-r from-[#070710] to-[#130c26] text-white font-bold rounded-2xl hover:from-[#130c26] hover:to-[#070710] transition-all duration-300 shadow-xl hover:shadow-2xl border border-indigo-500/20" 
             onClick={() => navigate('/auth/become-organizer')}>
              Join Us Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMorePage;