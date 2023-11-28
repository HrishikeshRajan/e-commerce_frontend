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
import ProtectedRoute, { RedirectIfUserExists } from './components/auth/ProtectedRoute';
import { ProtectedRouteProps } from './components/auth';
import AuthHelper from './components/auth/apis/helper';
import Dashboard from './components/marketplace/Dashboard';
import AddressWrapper from './components/user/address/AddressList';
import EditAddress from './components/user/address/EditAddress';
import { parseAddressFromLocalStorage, parseSpecificAddressFromLocalStorage } from './loaderHelpers/address.helper';
import AddAddress from './components/user/address/AddAddress';
import store from './utils/store';

const protectedRouteProps:Omit<ProtectedRouteProps, 'outlet'> = {
  authenticationPath: '/auth',
};

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
          element: <Home />,
        },
        {
          path: 'auth',
          element: <RedirectIfUserExists outlet={<Auth />} />,
        },

        {
          path: '/account',
          element: <Account />,
          children: [
            {
              path: 'profile',
              element: <ProtectedRoute {...protectedRouteProps} outlet={<Profile />} />,
            },
            {
              path: 'address',
              element: <ProtectedRoute {...protectedRouteProps} outlet={<AddressWrapper />} />,
              loader: () => parseAddressFromLocalStorage(),
            },
            {
              path: 'address/edit',
              element: <ProtectedRoute {...protectedRouteProps} outlet={<EditAddress />} />,
              loader: () => parseAddressFromLocalStorage(),
            },
            {
              path: 'address/edit/:addressId',
              element: <ProtectedRoute
                {...protectedRouteProps}
                outlet={<EditAddress />}
              />,
              loader: ({ params }) => parseSpecificAddressFromLocalStorage(params),
            },
            {
              path: 'address/add',
              element: <ProtectedRoute {...protectedRouteProps} outlet={<AddAddress />} />,
            },

          ],
        },

        {
          path: 'marketplace',
          element: <Dashboard />,
        },
      ],

    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={allRoutes} />
    </Provider>
  );
};

export default App;
