/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import useFetchCart from '@/hooks/useCart';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { Promo } from '@/types/Promo';
import { useSearchParams } from 'react-router-dom';
import useFilter from '@/hooks/useFilter';
import useFetchUserPromos from '@/hooks/user/useAllPromos';
import usePreviousPurchases from '@/hooks/user/usePreviousPurchases';
import localCart from '@/utils/cart.helper';
import { getLocalStorageItem } from '@/utils/localstorage.helper';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import { addFlashSaleItem } from '@/utils/reduxSlice/appSlice';
import { ClientFlashSale } from '@/types/Sale';
import orderHelper from '@/utils/order.helper';
import { resetOrders } from '@/utils/reduxSlice/orderSlice';
import Categories from './Categories';
import FlashSaleBanner from '../flashsale/FlashSaleBanner';
import Coupon from '../coupons/Coupon';
import Line from './ui/Line';
import Card from '../products/Card';
import { ProductUser } from '../products/types';
import ProductCardsWrapper from '../products/v2/ProductWrapper';
import Heading from './ui/Heading';
import Div from '../CustomElements/Div';
import Sort from './filter/Sort';
import FilterBox from './sidebar/FilterBox';

const isCouponExpired = (coupon:Promo) => coupon.status === 'EXPIRED';
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
  }, [dispatch]);
  const [searchParams] = useSearchParams();

  const { loadingPromos, promos } = useFetchUserPromos();
  const { orders, loadingOrders } = usePreviousPurchases();

  const { filter, loading } = useFilter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    searchParams.toString() ? (

      <Div className="w-full relative ">
        <Div className="w-full container  top-full mt-28  flex justify-end">
          <Sort />
        </Div>

        {filter && !loading
        && (
          <Div className={`fixed left-0 xl:hidden bg-white right-0 bottom-0  delay-75 duration-150 ease overflow-y-auto  z-40  xl:bottom-10 xl:left-0 ${isOpen ? 'h-full ' : 'h-20'}`}>
            <FilterBox filter={filter} toggleButton={toggleBottomSheet} isOpen={isOpen} />
          </Div>
        )}
        <Div className="flex">
          {filter && !loading
        && (
          <Div className="fixed bg-white w-3/12 left-0 hidden xl:flex right-auto  py-2  delay-75 duration-150 ease overflow-y-auto  z-40 h-5/6 ">
            <FilterBox filter={filter} toggleButton={toggleBottomSheet} isOpen={isOpen} />
          </Div>
        )}
          <Div className="fixed flex p-2 h-screen  xl:right-0 xl:w-9/12 w-full   justify-end overflow-y-auto">
            <ProductCardsWrapper className="flex w-full xl:gap-2 ">
              <Div className="w-full flex flex-wrap xl:px-5 ">
                {
                  searchProductsList.map((item) => <Card key={item._id} {...item} />)
                }
              </Div>
            </ProductCardsWrapper>
          </Div>
        </Div>
      </Div>
    ) : (
      <div>
        <FlashSaleBanner />
        <Categories />
        { !loadingPromos && promos && promos.length ? (
          <div className="container">
            <Heading className="text-xl xl:text-4xl  text-orange-500 drop-shadow-lg text-center mt-10 font-bold">
              LATEST OFFERS
            </Heading>
            <Line />
            <div className="flex w-full gap-2 justify-center mt-10 overflow-y-auto">
              {promos?.map((coupon:Promo) => {
                if (!isCouponExpired(coupon)) {
                  return <Coupon key={coupon._id} coupon={coupon} />;
                }
                return null;
              })}
            </div>
          </div>
        ) : null}

        {!loadingOrders && orders && orders.length ? (
          <div className="container">
            <Heading className="text-xl xl:text-4xl  text-orange-500 drop-shadow-lg text-center mt-10 font-bold">
              PREVIOUS PURCHASES
            </Heading>
            <Line />
            <div className="flex w-full gap-2 justify-start mt-10 overflow-y-auto">
              {orders?.map((item:Pick<ProductUser, 'name' | 'price' | 'brand' | '_id' | 'ratings' | 'images' | 'numberOfReviews' >) => <Card key={item._id} {...item} />)}
            </div>
          </div>
        ) : null }
      </div>
    )

  );
}

export default Home;
