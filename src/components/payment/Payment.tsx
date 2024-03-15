/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import cart from '@/utils/cart.helper';
import { useNavigate } from 'react-router-dom';
import orderHelper from '@/utils/order.helper';
import {
  FetchResponse, isFetchError404, isFetchSuccess,
} from '@/types/Fetch';
import { notifyError } from '@/utils/toast';
import BackButton from '@/utils/BackButton';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import CheckoutPage from './CheckoutPage';
import Desclaimer from './Desclaimer';
import { hasPaymentProperties } from '.';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function Payment() {
  const [clientSecret, setClientSecret] = useState('');

  const cartId = cart.get()?.cartId;
  const orderId = orderHelper.getOrderId();
  const navigate = useNavigate();

  useEffect(() => {
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
        } else if (isFetchError404(result)) {
          return navigate('/cart');
        } else {
          notifyError(result.error);
        }
      })
      .catch((error:unknown) => notifyError((error as Error).message));
  }, [cartId, navigate, orderId]);

  const appearance:any = {
    theme: 'stripe',
  };
  const options:StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  const userCart = cart.get();

  useEffect(() => {
    if (!userCart) {
      return navigate('/');
    }
  }, [navigate, userCart]);

  return (
    <>

      <div className=" mt-20 lg:mt-20 ">
        <BackButton>
          {' '}
          <HiOutlineArrowNarrowLeft />
          {' '}
          Back to Address
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
