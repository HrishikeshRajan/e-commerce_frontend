/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import { lazy, Suspense } from 'react';
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
import { AuthenticationWrapper, RedirectIfAuthenticated } from './middleware/ProtectedRoute';

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
import CouponWrapper from './components/coupons/CouponWrapper';
import SellerNavbar from './components/navbar/Marketplace/NavbarSeller';
import PageNotFound from './components/error/PageNotFound';
import { getSingleProduct } from './components/products/apis/getSingleProduct';
import ConfirmEmail from './components/error/ConfirmEmail';
import FlashSaleProductPage from './components/flashsale/FlashSaleProductPage';
import ProductsPage from './components/products/ProductsPage';
import ProductView from './components/home/SingleProduct/ProductView';
import ShippingAddress from './components/order/address/ShippingAddress';
import Payment from './components/payment/Payment';
import PaymentSuccess from './components/payment/PaymentSuccess';
import PageWaiting from './utils/animations/PageWaiting';

const Account = lazy(() => import('./components/user/Account'));
const Cart = lazy(() => import('./components/cart/Cart'));
const Orders = lazy(() => import('./components/order/Orders'));
const Main = lazy(() => import('./components/marketplace/dashboard/pages/Main'));
const ShopsWrapper = lazy(() => import('./components/marketplace/dashboard/pages/shop/ShopsWrapper'));
const ProductWrapper = lazy(() => import('./components/marketplace/dashboard/pages/products/ProductWrapper'));
const SalesWrapper = lazy(() => import('./components/marketplace/dashboard/pages/sales/SalesWapper'));
const SettingSWapper = lazy(() => import('./components/marketplace/dashboard/pages/settings/SettingSWapper'));
const CreateShop = lazy(() => import('./components/marketplace/dashboard/pages/shop/CreateShop'));
const ListShops = lazy(() => import('./components/marketplace/dashboard/pages/shop/ListShops'));
const EditForm = lazy(() => import('./components/marketplace/dashboard/ui/forms/EditForm'));
const AddProductForm = lazy(() => import('./components/marketplace/dashboard/ui/forms/AddProductForm'));
const EditProductForm = lazy(() => import('./components/marketplace/dashboard/ui/forms/EditProducts'));
const OrderWrapper = lazy(() => import('./components/marketplace/dashboard/pages/orders/OrderWrapper'));
const OrderTableWrapper = lazy(() => import('./components/marketplace/dashboard/pages/orders/OrderTableWrapper'));
const OfferWrapper = lazy(() => import('./components/marketplace/dashboard/pages/offers/OfferWrapper'));
const CreateCouponForm = lazy(() => import('./components/marketplace/dashboard/pages/offers/ui/CreateCouponForm'));
const CouponList = lazy(() => import('./components/marketplace/dashboard/pages/offers/ui/CouponList'));
const FlashSaleWrapper = lazy(() => import('./components/marketplace/dashboard/pages/flashsale/FlashsaleWrapper'));
const FlashSaleForm = lazy(() => import('./components/marketplace/dashboard/pages/flashsale/FlashSaleForm'));
const ListProductsWrapper = lazy(() => import('./components/marketplace/dashboard/pages/products/ListProductsWrapper'));
const Dashboard = lazy(() => import('./components/marketplace/dashboard/pages/Dashboard'));

// All user components handled here
const Element = () => (
  <div className=" relative ">
    <Navbar />
    <Outlet />
  </div>
);

// All markplace components handled here
const MarketPlace = () => (
  <Suspense fallback={<PageWaiting loading />}>
    <div className="relative">
      <SellerNavbar />
      <Dashboard />
    </div>
  </Suspense>
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
            <Suspense fallback={<PageWaiting loading />}>
              <AuthenticationWrapper authentication={false}>
                <Cart />
              </AuthenticationWrapper>
            </Suspense>
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
            <Suspense fallback={<PageWaiting loading />}>
              <AuthenticationWrapper authentication={false}>
                <Orders />
              </AuthenticationWrapper>
            </Suspense>
          ),
        },
        {
          path: '/account',
          element: (
            <Suspense fallback={<PageWaiting loading />}>
              <AuthenticationWrapper authentication>
                <Account />
              </AuthenticationWrapper>
            </Suspense>
          ),
          children: [
            {
              index: true,
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
              loader: ({ params }) => parseSpecificAddressFromLocalStorage(params) || null,
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
            {
              element: (
                <AuthenticationWrapper authentication={false}>
                  <PageNotFound />
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
            {
              element: (
                <AuthenticationWrapper authentication={false}>
                  <PageNotFound />
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
            {
              element: (
                <AuthenticationWrapper authentication={false}>
                  <PageNotFound />
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
            {
              element: (
                <AuthenticationWrapper authentication={false}>
                  <PageNotFound />
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
            {
              element: (
                <AuthenticationWrapper authentication={false}>
                  <PageNotFound />
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
        {
          element: (
            <AuthenticationWrapper authentication={false}>
              <PageNotFound />
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
    {
      path: '/*',
      element: (
        <AuthenticationWrapper authentication={false}>
          <PageNotFound />
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
