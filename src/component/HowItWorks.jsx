import React from 'react';

export const HowItWorks = () => {
  return (
    <section className="w-full bg-gray-50">
      <div className="w-[95%] max-w-6xl mx-auto py-16 md:py-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            How It Works
          </h2>
          <p className="mt-3 text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Simple steps to book your event tickets quickly and securely.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <div className="h-16 w-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.59a.75.75 0 0 0-1.06-1.06l-4.69 4.69-1.41-1.41a.75.75 0 1 0-1.06 1.06l1.94 1.94c.293.293.767.293 1.06 0l5.22-5.22Z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-bold tracking-wide text-gray-800">
              Choose Events & Tickets
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Browse from a wide range of events and pick the tickets you want with just a few clicks.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.5 3.75a3 3 0 0 0-3 3V9H6a.75.75 0 0 0 0 1.5h1.5v6.75A2.25 2.25 0 0 0 9.75 19.5h7.5A2.25 2.25 0 0 0 19.5 17.25V10.5H21a.75.75 0 0 0 0-1.5h-1.5V6.75a3 3 0 0 0-3-3h-6Zm4.5 0a1.5 1.5 0 0 1 1.5 1.5V9h-6V5.25A1.5 1.5 0 0 1 12 3.75h3Z"/>
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-bold tracking-wide text-gray-800">
              Buy Directly From Organizers
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Enjoy safe payments online or pay with cash on delivery without hidden fees.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <div className="h-16 w-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Zm2.25-.75a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V6.75a.75.75 0 0 0-.75-.75H5.25Zm1.5 2.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm0 3a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5H7.5a.75.75 0 0 1-.75-.75Zm0 3A.75.75 0 0 1 8.25 13.5h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-bold tracking-wide text-gray-800">
              Receive Tickets
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Get instant e-tickets in your email or request doorstep delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;