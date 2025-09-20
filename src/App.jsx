import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { WishlistProvider } from './context/WishlistContext'


export const App = () => {
  return (
    <div>
      <WishlistProvider>
      <RouterProvider router={router} />
      </WishlistProvider>
      
    
      
    </div>
  )
}
