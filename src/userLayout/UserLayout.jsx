import React from 'react'
import { Header } from '../component/Header'
import { OrganizerHeader } from '../component/OrganizerHeader'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../component/Footer'

export const UserLayout = () => {
  const location = useLocation();

  // ✅ Cover all organizer-related pages explicitly
  const isOrganizerPage = [
    '/dashboard',
    '/become-organizer',
    '/OrganizerEventList',
    '/OrganizerEventDetail',
    '/Organizerbooking/details',
    '/event/create',
  ].some(path => location.pathname.startsWith(path));

  return (
    <div className='min-h-screen flex flex-col'>
      {isOrganizerPage ? <OrganizerHeader /> : <Header />}
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
