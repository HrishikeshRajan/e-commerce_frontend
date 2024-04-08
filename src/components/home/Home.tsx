/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import useFetchCart from '@/hooks/useCart';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import { Promo } from '@/types/Promo';
import Categories from './Categories';
import FlashSaleBanner from '../flashsale/FlashSaleBanner';
import Coupon from '../coupons/Coupon';
import Line from './ui/Line';
import Card from '../products/Card';
import { ProductUser } from '../products/types';
import ProductCardsWrapper from '../products/v2/ProductWrapper';
import Heading from './ui/Heading';

async function getAllpromos() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/promo/all?status=ACTIVE`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function getPurchasedProducts() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/success/all`, { credentials: 'include' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
function Home() {
  const cart = useTypedSelector((store) => store.cart.cart);
  const searchProductsList = useTypedSelector((store) => store.products.userProducts);
  const num = (cart && Object.values(cart).length < 1) || false;
  const [promos, setPromos] = useState<Promo[]>();
  const [products, setProducts] = useState<ProductUser[]>();
  useFetchCart(num);

  useEffect(() => {
    getAllpromos().then((result) => {
      setPromos(result.message.promos);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    getPurchasedProducts().then((result) => {
      // setPromos(result.message.promos);
      setProducts(result.message.orders);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    searchProductsList && searchProductsList.length ? (

      <ProductCardsWrapper>
        {
          searchProductsList.map((item) => <Card key={item._id} {...item} />)

        }
      </ProductCardsWrapper>
    ) : (
      <div>
        <FlashSaleBanner />
        <Categories />
        <div className="container">
          <Heading className="text-xl xl:text-4xl  text-orange-500 drop-shadow-lg text-center mt-10 font-bold">
            LATEST OFFERS
          </Heading>
          <Line />
          <div className="flex w-full gap-2 justify-center mt-10 overflow-y-auto">
            {promos?.map((coupon: Promo) => <Coupon key={coupon._id} coupon={coupon} />)}
          </div>
        </div>
        <div className="container">
          <Heading className="text-xl xl:text-4xl  text-orange-500 drop-shadow-lg text-center mt-10 font-bold">
            PREVIOUS PURCHASES
          </Heading>

          <Line />
          <div className="flex w-full gap-2 justify-center mt-10 overflow-y-auto">
            {products?.map((item:Pick<ProductUser, 'name' | 'price' | 'brand' | '_id' | 'ratings' | 'images' | 'numberOfReviews' >) => <Card key={item._id} {...item} />)}
          </div>
        </div>
      </div>
    )

  );
}

export default Home;
