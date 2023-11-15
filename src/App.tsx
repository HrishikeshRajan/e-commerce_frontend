/* eslint-disable react/function-component-definition */
import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Navbar from './components/navbar/Navbar';
import Account from './components/user/Account';

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
    {
      path: '/account',
      element: (
        <>
          <Navbar />
          <Account />
        </>
      ),
    },
  ]);
  return (
    <RouterProvider router={allRoutes} />
  );
};

export default App;
