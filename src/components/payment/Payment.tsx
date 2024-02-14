/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import cart from '@/utils/cart.helper';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import orderHelper from '@/utils/order.helper';
import CheckoutPage from './CheckoutPage';
import Desclaimer from './Desclaimer';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
function Payment() {
  const [clientSecret, setClientSecret] = useState('');

  const cartId = useTypedSelector((store) => store.cart.cartResponse.cartId);
  const orderId = orderHelper.getOrderId();

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/orders/create', {
      method: 'POST',
      body: JSON.stringify({
        paymentMethodTypes: 'card', currency: 'inr', cartId, orderId,
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then((result) => result.json())
      .then((result) => setClientSecret(result.message.clientSecret))
      .catch((error:any) => console.log(error));
  }, []);

  const appearance:any = {
    theme: 'stripe',
  };
  const options:StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  const navigate = useNavigate();

  const userCart = cart.get();

  useEffect(() => {
    if (!userCart) {
      return navigate('/');
    }
  }, [navigate, userCart]);

  return (
    <>
      <div className="p-5 mt-20 lg:mt-20 ">
        <h2 className="font-bold text-lg text-center text-slate-500 mt-5 py-2">Credit/Debit Card</h2>
        <Desclaimer />
      </div>
      <div className="w-full relative flex flex-col justify-center items-center">

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
