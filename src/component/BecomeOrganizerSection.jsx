import React from "react";
import { useNavigate } from "react-router-dom";

export const BecomeOrganizerSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#0c1030] py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-[95%] max-w-6xl mx-auto relative z-10">
        {/* Main Content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 mb-8">
            <span className="text-2xl">🚀</span>
            <span className="text-indigo-300 font-semibold text-sm uppercase tracking-wider">Join Our Community</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
            Become an Event Organizer
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of successful organizers who trust our platform to create, manage, and promote amazing events that bring people together.
          </p>
        </div>

      
        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-indigo-500/20 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join us and start creating unforgettable experiences. Whether you're planning concerts, conferences, festivals, or corporate events, we've got you covered.
            </p>
            
             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <button 
                 onClick={() => navigate('/become-organizer')}
                 className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
               >
                 <span className="flex items-center gap-2">
                   Join Us Now
                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                   </svg>
                 </span>
               </button>
               
               <button className="px-8 py-4 bg-transparent border-2 border-indigo-500/30 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-indigo-400/50 transition-all duration-300">
                 Learn More
               </button>
             </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">1000+</div>
                <div className="text-sm text-gray-400">Active Organizers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-gray-400">Events Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">2M+</div>
                <div className="text-sm text-gray-400">Tickets Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">99%</div>
                <div className="text-sm text-gray-400">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeOrganizerSection;
