import React from 'react'
import Header from '../component/Header'
import { OrganizerHeader } from '../component/OrganizerHeader'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../component/Footer'

export const UserLayout = () => {
  const location = useLocation();

  // ✅ Cover all organizer-related pages explicitly
  const isOrganizerPage = [
    '/auth/dashboard',

    '/auth/OrganizerEventList',
    '/auth/OrganizerEventDetail',
    '/Organizerbooking/details',
    '/auth/event/create',
    '/auth/organizer/bookings',
    '/auth/cancelled/booking',
    '/auth/organizer/analytics',
    '/auth/admin/approved/events',
    '/auth/event/create',
    '/auth/event/update/',
    '/auth/organizer/events',
    '/auth/organizer/rating',
    '/auth/organizer/notification',
    '/auth/organizer/profile'
  ].some(path => location.pathname.startsWith(path));

  return (
    <div className='min-h-screen flex flex-col'>
      {/* For organizer pages, we let the nested OrganizerLayout handle the header/sidebar */}
      {!isOrganizerPage && <Header />}

      <main className='flex-1'>
        <Outlet />
      </main>

      {!isOrganizerPage && <Footer />}
    </div>
  )
}
