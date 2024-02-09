/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import cart from '@/utils/cart.helper';
import { useNavigate } from 'react-router-dom';
import CheckoutPage from './CheckoutPage';
import Desclaimer from './Desclaimer';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
function Payment() {
  const appearance:any = {
    theme: 'stripe',
  };
  const options:StripeElementsOptions = {
    appearance,
  };

  const navigate = useNavigate();

  const userCart = cart.get();

  useEffect(() => {
    if (!userCart) {
      return navigate('/');
    }
  }, []);
  return (
    <>
      <div className="p-5 mt-20 lg:mt-20 ">
        <h2 className="font-bold text-lg text-center text-slate-500 mt-5 py-2">Credit/Debit Card</h2>
        <Desclaimer />
      </div>
      <div className="w-full relative flex flex-col justify-center items-center">

        <Elements options={options} stripe={stripePromise}>
          <CheckoutPage />
        </Elements>
      </div>
    </>
  );
}

export default Payment;
