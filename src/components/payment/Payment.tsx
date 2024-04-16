/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import orderHelper from '@/utils/order.helper';
import {
  FetchResponse, isFetchNotFoundError, isFetchSuccess,
} from '@/types/Fetch';
import { notifyError } from '@/utils/toast';
import BackButton from '@/utils/BackButton';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import useFetchCart from '@/hooks/useCart';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import CheckoutPage from './CheckoutPage';
import Desclaimer from './Desclaimer';
import { hasPaymentProperties } from '.';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function Payment() {
  const [clientSecret, setClientSecret] = useState('');

  const orderId = orderHelper.getOrderId();
  const navigate = useNavigate();
  const cart = useTypedSelector((store) => store.cart.cart);

  useFetchCart(false);

  useEffect(() => {
    if (cart && cart.cartId) {
      const { cartId } = cart;
      fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/create`, {
        method: 'POST',
        body: JSON.stringify({
          paymentMethodTypes: 'card', currency: 'inr', cartId, orderId,
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }).then((result) => result.json())
        .then((result:FetchResponse) => {
          if (isFetchSuccess(result)) {
            if (hasPaymentProperties(result.message)) {
              setClientSecret(result.message.clientSecret);
            }
          } else if (isFetchNotFoundError(result)) {
            return navigate('/cart');
          } else {
            notifyError(result.error);
          }
        })
        .catch((err) => notifyError((err as Error).message));
    }
  }, [cart, navigate, orderId]);

  const appearance:any = {
    theme: 'stripe',
  };
  const options:StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  if (!cart) return <p>Loading</p>;

  return (
    <>

      <div className=" mt-20 lg:mt-20 ">
        <BackButton>
          {' '}
          <HiOutlineArrowNarrowLeft />
          {' '}
          Back to Cart
        </BackButton>
        <h2 className="font-bold text-lg text-center text-slate-500 mt-5 py-2">Credit/Debit Card</h2>
        <div className="p-5">
          <Desclaimer />
        </div>
      </div>
      <div className="w-full p-5 relative flex flex-col justify-center items-center">

        {clientSecret && (
          <Elements options={options} stripe={stripePromise} key={clientSecret}>
            <CheckoutPage />
          </Elements>
        )}
      </div>
    </>
  );
}

export default Payment;
