/* eslint-disable react/jsx-props-no-spreading */
import {
  lazy, Suspense, useEffect, useMemo, useState,
} from 'react';
import useFetchCart from '@/hooks/useCart';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { useSearchParams } from 'react-router-dom';
import useFilter from '@/hooks/useFilter';
import localCart from '@/utils/cart.helper';
import { getLocalStorageItem } from '@/utils/localstorage.helper';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import { addFlashSaleItem, currentPage } from '@/utils/reduxSlice/appSlice';
import { ClientFlashSale } from '@/types/Sale';
import orderHelper from '@/utils/order.helper';
import { resetOrders } from '@/utils/reduxSlice/orderSlice';
import Loading from '@/utils/animations/Loading';
import Categories from './Categories';
import Card from '../products/Card';
import ProductCardsWrapper from '../products/v2/ProductWrapper';
import Div from '../CustomElements/Div';
import Loader from '../flashsale/Loader';

const FlashSaleBanner = lazy(() => import('../flashsale/FlashSaleBanner'));
const LatestOffers = lazy(() => import('./promos/LatestOffers'));
const PreviousOrders = lazy(() => import('./orders/PreviousOrders'));
const FilterBox = lazy(() => import('./sidebar/FilterBox'));
const Sort = lazy(() => import('./filter/Sort'));
function Home() {
  const cart = useTypedSelector((store) => store.cart.cart);
  const searchProductsList = useTypedSelector((store) => store.products.userProducts);
  const num = (cart && Object.values(cart).length < 1) || false;
  const dispatch = useTypedDispatch();
  useFetchCart(num);
  useEffect(() => {
    const lCart = localCart.get();
    const flash = getLocalStorageItem<ClientFlashSale>('flash');
    if (lCart) {
      dispatch(addToCart(lCart));
    }
    if (flash && flash._id) {
      dispatch(addFlashSaleItem(flash));
    }
  }, [dispatch]);

  /**
   * since each checkout creates new cart
   */
  useEffect(() => {
    dispatch(resetOrders());
    orderHelper.clearOrder();
    orderHelper.clearOrderId();
    dispatch(currentPage('home'));
    return () => {
      dispatch(currentPage(''));
    };
  }, [dispatch]);
  const [searchParams] = useSearchParams();

  const { filter, loading } = useFilter();
  const memoFilter = useMemo(() => filter, [filter]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    searchParams.toString() ? (

      <Div className="w-full relative pb-20">
        <Div className="w-full container  top-full mt-28  flex justify-end">
          <Suspense fallback={<div className="w-full h-20 bg-slate-200"><Loading /></div>}>
            <Sort />
          </Suspense>
        </Div>

        {memoFilter && !loading
        && (

          <Div className={`fixed left-0 xl:hidden bg-white right-0 bottom-0  delay-75 duration-150 ease overflow-y-auto  z-40  xl:bottom-10 xl:left-0 ${isOpen ? 'h-full ' : 'h-20'}`}>
            <Suspense fallback={<div className="fixed left-0 xl:hidden bg-white right-0 bottom-0  delay-75 duration-150 ease overflow-y-auto  z-40  xl:bottom-10 xl:left-0"><Loading /></div>}>
              <FilterBox filter={memoFilter} toggleButton={toggleBottomSheet} isOpen={isOpen} />
            </Suspense>
          </Div>
        )}
        <Div className="flex">
          {memoFilter && !loading
        && (
          <Div className="fixed bg-white w-3/12 left-0 hidden xl:flex right-auto  py-2  delay-75 duration-150 ease overflow-y-auto  z-40 h-5/6 ">
            <Suspense fallback={<div className="fixed bg-white w-3/12 left-0 hidden xl:flex right-auto  py-2  delay-75 duration-150 ease overflow-y-auto  z-40 h-5/6"><Loading /></div>}>
              <FilterBox filter={memoFilter} toggleButton={toggleBottomSheet} isOpen={isOpen} />
            </Suspense>
          </Div>
        )}
          <Div className="fixed flex p-2   xl:right-0 xl:w-9/12 w-full   justify-end overflow-y-auto">
            <ProductCardsWrapper className="flex w-full">
              <Div className="w-full flex sm:gap-2 justify-center">
                {
                  searchProductsList.map((item) => <Card key={item._id} {...item} />)
                }
              </Div>
            </ProductCardsWrapper>
          </Div>
        </Div>
      </Div>
    ) : (
      <div className="pb-20 flex flex-col gap-4 rounded-xl relative">
        <Suspense fallback={(
          <div
            className="w-full top-full mt-20 relative  h-56 sm:h-96 bg-slate-700 flex justify-center items-center text-center flex-col"
          >
            <Loader title="Looking for great offers for you" className="text-xl sm:text-3xl my-10 font-semibold text-slate-200" />
          </div>
        )}
        >
          <FlashSaleBanner />
        </Suspense>
        <Categories />
        <Suspense fallback={<div className="w-full h-96 bg-slate-200"><Loading /></div>}>
          <LatestOffers />
        </Suspense>
        <Suspense fallback={<div className="w-full h-96 bg-slate-200"><Loading /></div>}>
          <PreviousOrders />
        </Suspense>

      </div>
    )

  );
}

export default Home;
