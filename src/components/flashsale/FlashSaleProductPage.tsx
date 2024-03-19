import React, { Suspense } from 'react';
import { formattedAmount } from '@/utils/convertToRupees';
import cart from '@/utils/cart.helper';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import { useLoaderData, Await, useNavigate } from 'react-router-dom';
import SingleProduct from '../home/SingleProduct/SingleProduct';
import Button from '../auth/ui/Button';
import Sizes from '../home/SingleProduct/ui/Sizes';
import Colors from '../home/SingleProduct/ui/Colors';

function FlashSale() {
  const dispatch = useDispatch();
  const data = useLoaderData() as any;
  const navigate = useNavigate();
  const handleRequest = (response:any, options:any, offers:any) => {
    const cartData = cart.addToCartFlash(response, options, offers);
    if (!cartData) return null;
    dispatch(addToCart(cartData));
    navigate('/cart');
  };

  return (
    <Suspense fallback={<div className="w-full h-screen bg-red-200">Fetching...</div>}>
      <Await resolve={data.product as any}>
        {(response) => (

          <div className="w-full flex mt-10 justify-center container">
            <SingleProduct
              product={response.message.product}
              offers={response.message.offers}
            >
              {response.message.offers
              && new Date().toString() < new Date(response.message.offers.flashsale.startTime)
                .toString()
              && (
                <>
                  <h1 className="text-3xl text-slate-900 animate-pulse font-semibold">COMMING SOON</h1>
                  <Button
                    mode="idle"
                    className="mt-5 mb-5 w-full  rounded-lg bg-orange-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="button"
                    disabled={false}
                  >
                    NOTIFY ME
                  </Button>
                </>
              )}
              {response.message.offers.flashsale
              && new Date().toString() >= new Date(response.message.offers.flashsale.startTime)
                .toString()
        && new Date().toString() <= new Date(response.message.offers.flashsale.endTime).toString()
        && (
          <>
            <Sizes
              sizes={response.message.product && response.message.product.sizes}
              productId={response.message.product._id}
            />
            <Colors
              color={response.message.product && response.message.product.color}
              productId={response.message.product._id}
            />
            <Button
              mode="idle"
              className="mt-5 mb-5  rounded-lg bg-orange-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="button"
              disabled={false}
              onClick={() => handleRequest(
                response.message.product,
                { color: response.message.product.color, size: response.message.product.sizes[0] },
                response.message.offers,
              )}
            >
              BUY for &nbsp;

              {response.message.offers.flashsale
                    && formattedAmount(response.message.offers.flashsale.priceAfterDiscount!)}

            </Button>
          </>
        )}

            </SingleProduct>
          </div>
        )}
      </Await>
    </Suspense>
  );
  // return (

  // );
}

export default FlashSale;
