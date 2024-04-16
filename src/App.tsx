/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import { Suspense, lazy } from 'react';
import './App.css';
import {
  createBrowserRouter, RouterProvider, Outlet, defer,
  LoaderFunctionArgs,
} from 'react-router-dom';
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
import AddProductForm from './components/marketplace/dashboard/ui/forms/AddProductForm';
import EditProductForm from './components/marketplace/dashboard/ui/forms/EditProducts';
import ProductsPage from './components/products/ProductsPage';
import ProductView from './components/home/SingleProduct/ProductView';
import Cart from './components/cart/Cart';
import ShippingAddress from './components/order/address/ShippingAddress';
import Payment from './components/payment/Payment';
import PaymentSuccess from './components/payment/PaymentSuccess';
import Orders from './components/order/Orders';
import OrderWrapper from './components/marketplace/dashboard/pages/orders/OrderWrapper';
import OrderTableWrapper from './components/marketplace/dashboard/pages/orders/OrderTableWrapper';
import ConfirmEmail from './components/auth/ConfirmEmail';
import FlashSaleProductPage from './components/flashsale/FlashSaleProductPage';
import { getSingleProduct } from './components/products/apis/getSingleProduct';
import CouponWrapper from './components/coupons/CouponWrapper';
import OfferWrapper from './components/marketplace/dashboard/pages/offers/OfferWrapper';
import CreateCouponForm from './components/marketplace/dashboard/pages/offers/ui/CreateCouponForm';
import CouponList from './components/marketplace/dashboard/pages/offers/ui/CouponList';
import FlashSaleWrapper from './components/marketplace/dashboard/pages/flashsale/FlashsaleWrapper';
import FlashSaleForm from './components/marketplace/dashboard/pages/flashsale/FlashSaleForm';
import SellerNavbar from './components/navbar/Marketplace/NavbarSeller';

const ListProductsWrapper = lazy(() => import('./components/marketplace/dashboard/pages/products/ListProductsWrapper'));

// All user components handled here
const Element = () => (
  <div className=" relative ">
    <Navbar />
    <Outlet />
  </div>
);

// All markplace components handled here
const MarketPlace = () => (
  <div className="relative">
    <SellerNavbar />
    <Dashboard />
  </div>
);

const App = () => {
  // useClearCookie('user');

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
          path: 'products',
          element: (
            <AuthenticationWrapper authentication={false}>
              <ProductsPage />
            </AuthenticationWrapper>
          ),
        },
        {
          path: 'product/:productId',
          element: (
            <AuthenticationWrapper authentication={false}>
              <ProductView />
            </AuthenticationWrapper>
          ),
        },
        {
          path: 'cart',
          element: (
            <AuthenticationWrapper authentication={false}>
              <Cart />
            </AuthenticationWrapper>
          ),
        },
        {
          path: 'address',
          element: (
            <AuthenticationWrapper authentication={false}>
              <ShippingAddress />
            </AuthenticationWrapper>
          ),
        },
        {
          path: 'payment',
          element: (
            <AuthenticationWrapper authentication={false}>
              <Payment />
            </AuthenticationWrapper>
          ),
        },
        {
          path: 'payment/success',
          element: (
            <AuthenticationWrapper authentication={false}>
              <PaymentSuccess />
            </AuthenticationWrapper>
          ),
        },
        {
          path: 'myOrders',
          element: (
            <AuthenticationWrapper authentication={false}>
              <Orders />
            </AuthenticationWrapper>
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
              index: true,
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
        {
          path: 'flashsale/:saleId/product/:productId',
          element: (
            <AuthenticationWrapper authentication={false}>
              <FlashSaleProductPage />
            </AuthenticationWrapper>
          ),
          loader: async ({ params }:
          LoaderFunctionArgs<{ saleId:string,
            productId:string }>) => defer({ product: getSingleProduct(params.productId!) }),

        },
        {
          path: 'coupons',
          element: (
            <AuthenticationWrapper authentication>
              <CouponWrapper />
            </AuthenticationWrapper>
          ),
          loader: async () => fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/promo?method=coupon`, { credentials: 'include' }),

        },
      ],
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
      path: 'confirm',
      element: (
        <RedirectIfAuthenticated authentication={false}>
          <ConfirmEmail />
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
      path: 'forgotConfirm',
      element: (
        <RedirectIfAuthenticated authentication={false}>
          <NewPassword />
        </RedirectIfAuthenticated>
      ),
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
              path: ':id',
              element: (
                <AuthenticationWrapper authentication>
                  <AddProductForm />
                </AuthenticationWrapper>
              ),
            },
            {
              index: true,
              element: (
                <AuthenticationWrapper authentication>
                  <Suspense fallback={<h1>Loding</h1>}>
                    <ListProductsWrapper />
                  </Suspense>
                </AuthenticationWrapper>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <AuthenticationWrapper authentication>
                  <EditProductForm />
                </AuthenticationWrapper>
              ),
            },
          ],
        },
        {
          path: 'orders',
          element: (
            <AuthenticationWrapper authentication>
              <OrderWrapper />
            </AuthenticationWrapper>
          ),
        },
        {
          path: 'orders/:id/order',
          element: (
            <AuthenticationWrapper authentication>
              <OrderTableWrapper />
            </AuthenticationWrapper>
          ),
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
          path: 'offers',
          element: (
            <AuthenticationWrapper authentication>
              <OfferWrapper />
            </AuthenticationWrapper>
          ),
          children: [
            {

              index: true,
              path: 'create',
              element: (
                <AuthenticationWrapper authentication>
                  <CreateCouponForm />
                </AuthenticationWrapper>
              ),
            },
            {
              path: 'list',
              element: (
                <AuthenticationWrapper authentication>
                  <CouponList />
                </AuthenticationWrapper>
              ),
            },
          ],
        },
        {
          path: 'flashsale',
          element: (
            <AuthenticationWrapper authentication>
              <FlashSaleWrapper />
            </AuthenticationWrapper>
          ),
          children: [
            {

              index: true,
              path: 'create',
              element: (
                <AuthenticationWrapper authentication>
                  <FlashSaleForm />
                </AuthenticationWrapper>
              ),
            },
          ],
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
