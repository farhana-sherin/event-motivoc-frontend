import React from "react";
import { Link } from "react-router-dom";

const BecomeOrganizerSection = () => {
  return (
    <section className="w-full ">
      <div className="w-[95%] max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl h-[300px] group">
          
          {/* Background Image with Zoom Effect */}
          <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
                alt="Event Crowd" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-500"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Create Your Own <span className="text-[var(--color-primary)]">Hype.</span>
            </h2>
            
            <p className="text-gray-300 text-base mb-6 max-w-xl">
               Turn your passion into an event. Join the platform where experiences happen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/become-organizer">
                <button className="px-6 py-2.5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                    Start Organizing
                </button>
              </Link>
              
              <Link to="/auth/learn/more">
                <button className="px-6 py-2.5 rounded-full bg-transparent border-2 border-white text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                    Learn More
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeOrganizerSection;