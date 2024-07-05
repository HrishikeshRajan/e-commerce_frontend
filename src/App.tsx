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
import { parseSpecificAddressFromLocalStorage } from './loaderHelpers/address.helper';

import AddressWrapper from './components/user/address/Wrapper';
import EditAddress from './components/user/address/EditForm';
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
import Footer from './components/footer/Footer';

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
const SidebarWrapper = lazy(() => import('./components/marketplace/dashboard/ui/sidenav/SidebarWrapper'));

// All user components handled here
const Element = () => (
  <div className="relative">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

// All markplace components handled here
const MarketPlace = () => (
  <Suspense fallback={<PageWaiting loading />}>
    <div className="relative">
      <SellerNavbar />
      <SidebarWrapper />
      <Outlet />
    </div>
  </Suspense>
);

const App = () => {
  const allRoutes = createBrowserRouter([
    {
      path: '/',
      element: <Element />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'products', element: <ProductsPage />,
        },
        {
          path: 'product/:productId', element: <ProductView />,
        },
        {
          path: 'cart',
          element: (
            <Suspense fallback={<PageWaiting loading />}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: 'address', element: <ShippingAddress />,
        },
        {
          path: 'payment',
          element: (
            <AuthenticationWrapper authentication>
              <Payment />
            </AuthenticationWrapper>
          ),
        },
        {
          path: 'payment/success',
          element: (
            <AuthenticationWrapper authentication>
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
              element: <PageNotFound />,
            },
          ],
        },
        {
          path: 'flashsale/:saleId/product/:productId',
          element: <FlashSaleProductPage />,
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
          element: <Main />,
        },
        {
          path: 'shop',
          element: <ShopsWrapper />,
          children: [
            {
              index: true,
              element: <CreateShop />,
            },
            {
              path: 'myshops',
              element: <ListShops />,
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
              element: <PageNotFound />,
            },
          ],
        },
        {
          path: 'product',
          element: <ProductWrapper />,
          children: [
            {
              index: true,
              path: 'list',
              element: (
                <Suspense fallback={<h1>Loding</h1>}>
                  <ListProductsWrapper />
                </Suspense>

              ),
            },
            {
              path: ':id',
              element: <AddProductForm />,
            },

            {
              path: 'edit/:id',
              element: <EditProductForm />,
            },
            {
              element: <PageNotFound />,

            },
          ],
        },
        {
          path: 'orders',
          element: <OrderWrapper />,
        },
        {
          path: 'orders/:id/order',
          element: <OrderTableWrapper />,
        },
        {
          path: 'sales',
          element: <SalesWrapper />,
        },
        {
          path: 'offers',
          element: <OfferWrapper />,
          children: [
            {

              index: true,
              path: 'create',
              element: <CreateCouponForm />,
            },
            {
              path: 'list',
              element: <CouponList />,
            },
            {
              element: <PageNotFound />,
            },
          ],
        },
        {
          path: 'flashsale',
          element: <FlashSaleWrapper />,
          children: [
            {

              index: true,
              path: 'create',
              element: <FlashSaleForm />,

            },
            {
              element: <PageNotFound />,
            },
          ],
        },
        {
          path: 'settings',
          element: <SettingSWapper />,
        },
        {
          element: <PageNotFound />,
        },
      ],
    },
    {
      path: '/expired',
      element: <Expired />,
    },
    {
      path: '/server/error',
      element: <ServiceUnavailable />,
    },
    {
      path: '/*',
      element: <PageNotFound />,
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={allRoutes} />
    </Provider>
  );
};

export default App;
