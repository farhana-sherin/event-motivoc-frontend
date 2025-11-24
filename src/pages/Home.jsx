import React from 'react';
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
    const [banner,setBanner]=useState([]);
    console.log(banner);
    useEffect(() => {
      const Banner=async()=>{
        try {
          const response=await axiosInstance.get("customer/banners/")
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
  return (
    <div className="home-container relative w-full">
      <section className="slider-section relative z-0 -mt-20">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={Array.isArray(banner) && banner.length > 1} 
          className="mySwiper"
        >
          {Array.isArray(banner) && banner.map((item)=>(
           <SwiperSlide key={item.id}>
           <div className="relative w-full h-[100vh] flex items-center justify-center">
             <img
               src={item.image}
               alt="Music Event"
               className="w-full h-full object-cover"
             />
             
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            
             <div className="absolute  text-center text-white px-6 animate-fadeInUp">
               <h1 className="text-5xl font-extrabold drop-shadow-lg">
                 {item.title}
               </h1>
               <p className="mt-3 text-lg text-gray-200 max-w-xl mx-auto">
                 {item.description}
               </p>
               <button className="mt-6 px-6 py-2 rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition">
                 Explore More
               </button>
             </div>
           </div>
         </SwiperSlide>

          ))}
        
          
         
        </Swiper>
      </section>
      <HowItWorks/>
      
      <UpcomingEvents/>
      <RecommendedEvents/>

      <FeaturedEvents/>
      <BecomeOrganizerSection/>
      
    </div>
  );
};
