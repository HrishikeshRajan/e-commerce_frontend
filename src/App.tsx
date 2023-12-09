/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import Auth from './components/auth/Auth';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Profile from './components/user/profile/Profile';
import Account from './components/user/Account';
import { AuthenticationWrapper, RedirectIfAuthenticated } from './components/middleware/ProtectedRoute';
import Dashboard from './components/marketplace_dashboard/Dashboard';
import AddressWrapper from './components/user/address/Wrapper';
import EditAddress from './components/user/address/EditForm';
import { parseSpecificAddressFromLocalStorage } from './loaderHelpers/address.helper';
import AddAddress from './components/user/address/AddForm';
import store from './utils/store';
import ForgotForm from './components/auth/ForgotForm';
import NewPassword from './components/auth/NewPassword';
import Expired from './components/error/Expired';
import Marketplace from './components/marketplace/Marketplace';
import ServiceUnavailable from './components/error/ServiceUnavailable';

const Element = () => (
  <div className="container min-h-screen">
    <Navbar />
    <Outlet />
  </div>
);

const App = () => {
  const allRoutes = createBrowserRouter([
    {
      path: '/',
      element: <Element />,
      children: [
        {
          path: '/',
          element: (
            <AuthenticationWrapper authentication={false}>
              <Home />
            </AuthenticationWrapper>
          ),
        },
        {
          path: 'auth',
          element: (
            <RedirectIfAuthenticated authentication={false}>
              <Auth />
            </RedirectIfAuthenticated>
          ),
        },
        {
          path: 'forgotpassword',
          element: (
            <RedirectIfAuthenticated authentication={false}>
              <ForgotForm />
            </RedirectIfAuthenticated>
          ),
        },
        {
          path: 'reset-password/:id',
          element: (
            <RedirectIfAuthenticated authentication={false}>
              <NewPassword />
            </RedirectIfAuthenticated>
          ),
        },

        {
          path: '/account',
          element: (
            <AuthenticationWrapper authentication>
              <Account />
            </AuthenticationWrapper>
          ),
          children: [
            {
              path: 'profile',
              element: (
                <AuthenticationWrapper authentication>
                  <Profile />
                </AuthenticationWrapper>
              ),
            },
            {
              path: 'address',
              element: (
                <AuthenticationWrapper authentication>
                  <AddressWrapper />
                </AuthenticationWrapper>
              ),
            },
            {
              path: 'address/edit/:addressId',
              element: (
                <AuthenticationWrapper authentication>
                  <EditAddress />
                </AuthenticationWrapper>
              ),
              loader: ({ params }) => parseSpecificAddressFromLocalStorage(params),
            },
            {
              path: 'address/add',
              element: (
                <AuthenticationWrapper authentication>
                  <AddAddress />
                </AuthenticationWrapper>
              ),
            },
            {
              path: 'marketplace',
              element: (
                <AuthenticationWrapper authentication>
                  <Marketplace />
                </AuthenticationWrapper>
              ),
            },

          ],
        },

        {
          path: 'marketplace/dashboard',
          element: (
            <AuthenticationWrapper authentication>
              <Dashboard />
            </AuthenticationWrapper>
          ),
        },
      ],

    },
    {
      path: '/expired',
      element: (
        <AuthenticationWrapper authentication={false}>
          <Expired />
        </AuthenticationWrapper>
      ),
    },
    {
      path: '/server/error',
      element: (
        <AuthenticationWrapper authentication={false}>
          <ServiceUnavailable />
        </AuthenticationWrapper>
      ),
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={allRoutes} />
    </Provider>
  );
};

export default App;
