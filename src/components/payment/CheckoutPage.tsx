/* eslint-disable no-nested-ternary */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-extraneous-dependencies */
import { FormEvent, useEffect, useState } from 'react';
import {
  PaymentElement, useElements, useStripe,
} from '@stripe/react-stripe-js';

import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import { formattedAmount } from '@/utils/convertToRupees';
import { notifyError } from '@/utils/toast';
import Button from '../auth/ui/Button';

function CheckoutForm() {
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const grandTotal = useTypedSelector((store) => store.cart.cart?.grandTotalPrice);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    try {
      if (!stripe) {
        return;
      }

      const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret',
      );

      if (!clientSecret) {
        return;
      }

      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case 'succeeded':
            setInputError('Payment succeeded!');

            break;
          case 'processing':
            setInputError('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setInputError('Your payment was not successful, please try again.');
            break;
          default:
            setInputError('Something went wrong.');
            break;
        }
      });
    } catch (error) {
      console.log('s',error);
    }
  }, [stripe]);

  if (!stripe || !elements) {
    return;
  }
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements, confirmParams: { return_url: 'http://localhost:5173/payment/success' }, redirect: 'always',
      });

      if ((error && error.type === 'card_error') || (error && error.type === 'validation_error')) {
        setInputError(error.message!);
        setLoading(false);
      }
    } catch (error) {
      notifyError('Payment failed. Please try again.');
    }
    setPaid(!paid);
    setLoading(false);
  };
  const paymentElementOptions:StripePaymentElementOptions = {
    layout: 'tabs',
    wallets: {
      googlePay: 'never',
      applePay: 'never',
    },
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-5 lg:w-6/12 shadow-md  lg:p-5 rounded ">
      {inputError && <h1 className="font-bold text-red-500 py-5">{inputError}</h1>}
      {loading ? <p className="text-slate-400 py-10 font-bold">Please don&apos;t close the tab during the payment</p> : ''}
      {!paid && <PaymentElement id="payment-element" options={paymentElementOptions} />}
      {loading ? (
        <Button
          mode="loading"
          className="w-full m-0 rounded-xl bottom-0 lg:static lg:bottom-auto disabled:bg-slate-400 outline-none bg-cyan-600 text-slate-50 shadow-sm   px-2 py-3 mt-5 font-bold"
          disabled
          type="button"
          loadingAnimation
        >
          Please wait
        </Button>
      )
        : (
          inputError ? (
            <Button
              mode="idle"
              className="w-full m-0 rounded-xl bottom-0 lg:static lg:bottom-auto disabled:bg-slate-400 outline-none bg-cyan-600 text-slate-50 shadow-sm   px-2 py-3 mt-5 font-bold"
              disabled={loading}
              type="submit"
              onClick={() => setInputError('')}
            >
              Try Again
            </Button>
          ) : (
            <Button
              mode="idle"
              className="w-full m-0 rounded-xl bottom-0 lg:static lg:bottom-auto disabled:bg-slate-400 outline-none bg-cyan-600 text-slate-50 shadow-sm   px-2 py-3 mt-5 font-bold"
              disabled={loading}
              type="submit"
            >
              PAY &nbsp;
              {formattedAmount(grandTotal!)}
            </Button>
          )
        )}
    </form>
  );
}

export default CheckoutForm;
