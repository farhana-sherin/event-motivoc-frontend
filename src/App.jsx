import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

export const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
      
    </div>
  )
}
