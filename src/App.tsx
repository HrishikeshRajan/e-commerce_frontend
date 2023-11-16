/* eslint-disable react/function-component-definition */
import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Profile from './components/user/Profile';
import Account from './components/user/Account';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ProtectedRouteProps } from './components/auth';

const protectedRouteProps:Omit<ProtectedRouteProps, 'outlet'> = {
  isAuthenticated: false,
  authenticationPath: '/auth',
};

const App = () => {
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
    {
      path: '/account/profile',
      element: (
        <>
          <Navbar />
          <ProtectedRoute {...protectedRouteProps} outlet={<Profile />} />
        </>
      ),

    },
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
  ]);
  return (
    <RouterProvider router={allRoutes} />
  );
};

export default App;
