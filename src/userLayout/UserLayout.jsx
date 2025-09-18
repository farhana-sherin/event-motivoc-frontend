import React from 'react'
import { Header } from '../component/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from '../component/Footer'

export const UserLayout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Header/>
        <main className='flex-1'>
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}
