import React from 'react';
import { Link } from 'react-router-dom';

export const HowItWorks = () => {
  return (
    <section className="w-full relative overflow-hidden py-20">
      {/* Ambient light effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 w-80 h-80 bg-[var(--color-primary)]/10 blur-[140px] animate-pulse"></div>
        <div className="absolute right-[-120px] top-32 w-96 h-96 bg-[var(--color-accent)]/12 blur-[170px] animate-pulse"></div>
        <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-[var(--color-secondary)]/10 blur-[150px] animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] mx-auto mb-6 rounded-full shadow-[0_8px_30px_-12px_rgba(124,58,237,0.6)]"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Simple steps to book your event tickets quickly and securely.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">

          {/* Step 1 */}
          <div className="flex-1 min-w-[280px] max-w-[350px]">
            <div className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1220] rounded-3xl p-10 border border-gray-800 hover:border-[var(--color-primary)]/70 hover:shadow-[0_20px_60px_-25px_rgba(124,58,237,0.5)] transition-all duration-300 group h-full text-center">

              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] text-white flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)] group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.59a.75.75 0 0 0-1.06-1.06l-4.69 4.69-1.41-1.41a.75.75 0 1 0-1.06 1.06l1.94 1.94c.293.293.767.293 1.06 0l5.22-5.22Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                Choose Events & Tickets
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Browse from a wide range of events and pick the tickets you want with just a few clicks.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex-1 min-w-[280px] max-w-[350px]">
            <div className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1220] rounded-3xl p-10 border border-gray-800 hover:border-[var(--color-primary)]/70 hover:shadow-[0_20px_60px_-25px_rgba(124,58,237,0.5)] transition-all duration-300 group h-full text-center">

              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] text-white flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)] group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.5 3.75a3 3 0 0 0-3 3V9H6a.75.75 0 0 0 0 1.5h1.5v6.75A2.25 2.25 0 0 0 9.75 19.5h7.5A2.25 2.25 0 0 0 19.5 17.25V10.5H21a.75.75 0 0 0 0-1.5h-1.5V6.75a3 3 0 0 0-3-3h-6Zm4.5 0a1.5 1.5 0 0 1 1.5 1.5V9h-6V5.25A1.5 1.5 0 0 1 12 3.75h3Z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                Buy Directly From Organizers
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Enjoy safe payments online or pay with cash on delivery without hidden fees.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex-1 min-w-[280px] max-w-[350px]">
            <div className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1220] rounded-3xl p-10 border border-gray-800 hover:border-[var(--color-primary)]/70 hover:shadow-[0_20px_60px_-25px_rgba(124,58,237,0.5)] transition-all duration-300 group h-full text-center">

              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] text-white flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)] group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                Receive Tickets
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Get instant e-tickets in your email or request doorstep delivery.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;