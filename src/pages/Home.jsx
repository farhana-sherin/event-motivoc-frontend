import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosInstance } from '../config/axiosinstance';
import HowItWorks from '../component/HowItWorks';
import UpcomingEvents from '../component/UpcomingEvents';
import FeaturedEvents from '../component/FeaturedEvents';
import BecomeOrganizerSection from '../component/BecomeOrganizerSection';
import RecommendedEvents from '../component/airecommendation';

export const Home = () => {
  const [banner, setBanner] = useState([]);
  console.log(banner);
  useEffect(() => {
    const Banner = async () => {
      try {
        const response = await axiosInstance.get("customer/banners/")
        // Ensure we always set an array
        const bannerData = response.data?.data || response.data || [];
        setBanner(Array.isArray(bannerData) ? bannerData : []);
      } catch (error) {
        console.log(error);
        setBanner([]); // Set empty array on error
      }
    }
    Banner();
  }, []);

  // Helper to format date safely
  const formatEventDate = (dateString) => {
    if (!dateString) return 'Date TBA';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Date TBA' : date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="home-container relative w-full bg-[#070710] min-h-screen pt-0 font-sans text-white overflow-hidden">

      {/* Dynamic Hero Section - Full Screen */}
      <section className="relative w-full h-screen overflow-hidden">

        {/* Ambient aurora glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 w-96 h-96 bg-[#070710]/22 blur-[180px] animate-pulse"></div>
          <div className="absolute right-[-140px] top-16 w-[480px] h-[480px] bg-[#070710]/22 blur-[220px] animate-pulse"></div>
          <div className="absolute left-1/3 bottom-[-120px] w-80 h-80 bg-[#070710]/22 blur-[200px] animate-pulse"></div>
        </div>

        {Array.isArray(banner) && banner.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={banner.length > 1}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            className="w-full h-full"
          >
            {banner.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative w-full h-full flex items-center justify-center pt-20">
                  {/* Background Image - Clearer visibility */}
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}>
                  </div>

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-black/35"></div>
                  <div className="absolute inset-0 "></div>
                  <div className="absolute inset-0 "></div>

                  {/* Content Container */}
                  <div className="container mx-auto px-6 xl:pl-32 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">

                    {/* Left Content */}
                    <div className="max-w-4xl animate-fade-in-up">
                      <div className="relative">
                        {console.log("Banner Item Data:", item)}
                        {/* Event Details - Main Feature */}
                        <div className="mb-8">
                          {/* Date & Location */}
                          <p className=" font-bold font-mono text-sm md:text-base tracking-widest mb-4 uppercase">
                            [ {formatEventDate(item.start_date)} - {formatEventDate(item.end_date)} ]
                          </p>

                          {/* Title & Description */}
                          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-none drop-shadow-xl">
                            {item.title}
                          </h2>
                          <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl line-clamp-3 mb-8 drop-shadow-md">
                            {item.description}
                          </p>

                          {/* Buttons */}
                          <div className="flex flex-wrap gap-4">
                            <Link to={`/auth/event/detail/${item.event}`} className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_10px_30px_rgba(124,58,237,0.4)] hover:shadow-[0_15px_40px_rgba(88,28,135,0.45)] hover:scale-105 transition-transform duration-300 uppercase tracking-widest flex items-center gap-2 group">
                              Get Ticket
                              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0B0B0C]">
            <h2 className="text-4xl text-white font-bold animate-pulse">Loading Events...</h2>
          </div>
        )}

        {/* Bottom Wave Divider - Simple Curve "Like This" */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none leading-none">
          <svg
            className="block w-full h-[15vw] max-h-[150px]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="waveShadow" x="-10%" y="-50%" width="120%" height="200%">
                <feDropShadow
                  dx="0"
                  dy="-2"
                  stdDeviation="6"
                  floodColor="#4b5563"
                  floodOpacity="0.25"
                />
              </filter>
              <linearGradient id="heroWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#070710" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#0c1020" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#070710" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <path
              fill="url(#heroWaveGradient)"
              d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              stroke="#070710"
              strokeOpacity="0.9"
              strokeWidth="3"
              filter="url(#waveShadow)"
            />
          </svg>
        </div>
      </section>

     

      <div className="bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26]">
        <HowItWorks />
      </div>

      <div className="py-16 bg-gradient-to-b from-[#130c26] via-[#0c1020] to-[#070710]">
        <UpcomingEvents />
      </div>

      <div className="py-16 bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26]">
        <RecommendedEvents />
      </div>

      <div className="py-16 bg-gradient-to-b from-[#130c26] via-[#0c1020] to-[#070710]">
        <FeaturedEvents />
      </div>

      <div className="py-16 bg-gradient-to-b from-[#070710] via-[#0c1020] to-[#130c26]">
        <BecomeOrganizerSection />
      </div>
      
    </div>
  );
};

export default Home;
