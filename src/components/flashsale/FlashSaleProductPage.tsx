import { Suspense } from 'react';
import { formattedAmount } from '@/utils/convertToRupees';
import cart from '@/utils/cart.helper';
import { useDispatch } from 'react-redux';
import { mergeToCart } from '@/utils/reduxSlice/cartSlice';
import {
  useLoaderData, Await, useNavigate, Link,
} from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ClientFlashSale, MethodParams } from '@/types/Sale';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import { getFinalAmount } from '@/utils/discounts/offer.helper';
import SingleProduct from '../home/SingleProduct/SingleProduct';
import Button from '../auth/ui/Button';
import Sizes from '../home/SingleProduct/ui/Sizes';
import Colors from '../home/SingleProduct/ui/Colors';

const isUserAlreadyPurchased = (flash:ClientFlashSale, userId:string = '1') => flash.users.usedBy.includes(userId);
function FlashSale() {
  const dispatch = useDispatch();
  const data = useLoaderData() as any;
  const navigate = useNavigate();
  const [flash] = useLocalStorage<string, ClientFlashSale>('flash');
  const flashsale = useTypedSelector((store) => store.app.flashSaleItem);
  const userId = useTypedSelector((store) => store.app.user?._id);

  const handleRequest = (response:any, options:any, offer: MethodParams) => {
    const cartData = cart.addToCartFlash(response, options, offer);
    if (!cartData) return null;
    dispatch(mergeToCart(cartData));
    navigate('/cart');
  };
  if (!flashsale) return;
  return (
    <Suspense fallback={<div className="w-full h-screen bg-red-200">Fetching...</div>}>
      <Await resolve={data.product as any}>
        {(response) => (

          <div className="w-full flex mt-10 justify-center container">
            <SingleProduct
              product={response.message.product}
              offers={{ flashsale }}
            >

              {flashsale
              && new Date() < new Date(flashsale.startTime)

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
              {flashsale
              && new Date() >= new Date(flashsale.startTime)

        && new Date() <= new Date(flashsale.endTime)
        && (
          <>

            {!isUserAlreadyPurchased(flash, userId) && (
              <Sizes
                sizes={response.message.product && response.message.product.sizes}
                productId={response.message.product._id}
              />
            ) }

            {!isUserAlreadyPurchased(flash, userId) && (
              <Colors
                color={response.message.product && response.message.product.color}
                productId={response.message.product._id}
              />
            ) }
            {isUserAlreadyPurchased(flash, userId) ? <p className="font-bold text-lg p-2  text-center bg-black text-white rounded-xl"><Link to="/">You already purchased</Link></p>
              : (
                <Button
                  mode="idle"
                  className="mt-5 mb-5  rounded-lg bg-orange-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="button"
                  disabled={false}
                  onClick={() => handleRequest(
                    response.message.product,
                    {
                      color: response.message.product.color,
                      size: response.message.product.sizes[0],
                    },
                    flashsale,
                  )}
                >
                  BUY for &nbsp;

                  {flashsale
                    && formattedAmount(getFinalAmount(response.message.product, flashsale, 12))}

                </Button>
              )}
          </>
        )}

            </SingleProduct>
          </div>
        )}
      </Await>
    </Suspense>
  );
}

export default FlashSale;
