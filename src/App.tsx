/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React, { Suspense, lazy } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import Auth from './components/auth/Auth';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Profile from './components/user/profile/Profile';
import Account from './components/user/Account';
import { AuthenticationWrapper, RedirectIfAuthenticated } from './middleware/ProtectedRoute';
import Dashboard from './components/marketplace/dashboard/pages/Dashboard';
import AddressWrapper from './components/user/address/Wrapper';
import EditAddress from './components/user/address/EditForm';
import { parseSpecificAddressFromLocalStorage } from './loaderHelpers/address.helper';
import AddAddress from './components/user/address/AddForm';
import store from './utils/store';
import ForgotForm from './components/auth/ForgotForm';
import NewPassword from './components/auth/NewPassword';
import Expired from './components/error/Expired';
import Marketplace from './components/user/Seller';
import ServiceUnavailable from './components/error/ServiceUnavailable';
import Main from './components/marketplace/dashboard/pages/Main';
import ShopsWrapper from './components/marketplace/dashboard/pages/shop/ShopsWrapper';
import ProductWrapper from './components/marketplace/dashboard/pages/products/ProductWrapper';
import SalesWrapper from './components/marketplace/dashboard/pages/sales/SalesWapper';
import SettingSWapper from './components/marketplace/dashboard/pages/settings/SettingSWapper';
import CreateShop from './components/marketplace/dashboard/pages/shop/CreateShop';
import ListShops from './components/marketplace/dashboard/pages/shop/ListShops';
import EditForm from './components/marketplace/dashboard/ui/forms/EditForm';
import Sidebar from './components/user/ui/sidebar/Sidebar';
import SellerNavbar from './components/navbar/Marketplace/NavbarSeller';
import AddProductForm from './components/marketplace/dashboard/ui/forms/AddProductForm';

const ListProductsWrapper = lazy(() => import('./components/marketplace/dashboard/pages/products/ListProductsWrapper'));
// All user components handled here
const Element = () => (
  <div className=" min-h-screen relative ">
    <Navbar />
    <Sidebar />
    <Outlet />
  </div>
);

// All markplace components handled here
const MarketPlace = () => (
  <div className=" min-h-screen relative ">
    <SellerNavbar />
    <Dashboard />
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
              path: 'seller',
              element: (
                <AuthenticationWrapper authentication>
                  <Marketplace />
                </AuthenticationWrapper>
              ),
            },

          ],
        },

      ],

    },
    {
      path: 'marketplace/dashboard',
      element: (
        <AuthenticationWrapper authentication>
          <MarketPlace />
        </AuthenticationWrapper>
      ),
      children: [
        {
          index: true,
          element: (
            <AuthenticationWrapper authentication>
              <Main />
            </AuthenticationWrapper>
          ),
        },
        {
          path: 'shop',
          element: (
            <AuthenticationWrapper authentication>
              <ShopsWrapper />
            </AuthenticationWrapper>
          ),
          children: [
            {
              index: true,

              element: (
                <AuthenticationWrapper authentication>
                  <CreateShop />
                </AuthenticationWrapper>
              ),
            },
            {
              path: 'myshops',
              element: (
                <AuthenticationWrapper authentication>
                  <ListShops />
                </AuthenticationWrapper>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <AuthenticationWrapper authentication>
                  <EditForm />
                </AuthenticationWrapper>
              ),
            },
          ],
        },
        {
          path: 'product',
          element: (
            <AuthenticationWrapper authentication>
              <ProductWrapper />
            </AuthenticationWrapper>
          ),
          children: [
            {
              index: true,

              element: (
                <AuthenticationWrapper authentication>
                  <AddProductForm />
                </AuthenticationWrapper>
              ),
            },
            {
              path: 'list',
              element: (
                <AuthenticationWrapper authentication>
                  <Suspense fallback={<h1>Loding</h1>}>
                    <ListProductsWrapper />
                  </Suspense>
                </AuthenticationWrapper>
              ),
            },
          ],
        },
        {
          path: 'sales',
          element: (
            <AuthenticationWrapper authentication>
              <SalesWrapper />
            </AuthenticationWrapper>
          ),
        },
        {
          path: 'settings',
          element: (
            <AuthenticationWrapper authentication>
              <SettingSWapper />
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
