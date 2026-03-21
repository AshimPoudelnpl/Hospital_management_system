import React from 'react'
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { indexRouter } from './router/IndexRoutes';

const App = () => {
  return (
    <div>
      <RouterProvider router={indexRouter} />
      <ToastContainer/>
    </div>
  )
}

export default App