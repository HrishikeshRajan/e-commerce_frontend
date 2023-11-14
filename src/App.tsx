import React, { Fragment } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Navbar from './components/navbar/Navbar';

const App: React.FC = () => {
  const allRoutes = createBrowserRouter([
    {
      path: '/auth',
      element: (
        <>
          <Navbar />
          <Auth />
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={allRoutes} />
    </>
  );
};

export default App;
