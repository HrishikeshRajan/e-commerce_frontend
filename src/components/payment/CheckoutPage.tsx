/* eslint-disable import/no-extraneous-dependencies */
import React, { FormEvent, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import orderHelper from '@/utils/order.helper';
import { useNavigate } from 'react-router-dom';
import cart from '@/utils/cart.helper';
import { clearCart } from '@/utils/reduxSlice/cartSlice';
import Loading from '@/utils/animations/Loading';
import { IoArrowForwardOutline } from 'react-icons/io5';

function CheckoutForm() {
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const cartId = useTypedSelector((store) => store.cart.cart.cartId);
  const orderId = orderHelper.getOrderId();
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/v1/orders/create', {
        method: 'POST',
        body: JSON.stringify({
          paymentMethodTypes: 'card', currency: 'inr', cartId, orderId,
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }).then((result) => result.json());

      const { clientSecret } = response.message;
      await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
    setPaid(!paid);
    setLoading(false);
    cart.clearCart();
    orderHelper.clearOrderId();
    dispatch(clearCart());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full lg:w-6/12 shadow-md  lg:p-5 rounded ">
      {loading ? <p className="text-slate-400 py-10 font-bold">Please don&apos;t close the tab during the payment</p> : ''}
      {!paid && <CardElement className="bg-white p-5" />}
      {paid ? (
        <button onClick={() => navigate('/')} type="button" className="w-full outline-none bg-cyan-400 text-slate-50 shadow-sm px-2 py-2 mt-5 font-bold flex justify-center items-center gap-2">
          <span> Continue Shopping</span>
          <IoArrowForwardOutline />
        </button>
      )
        : (
          <button type="submit" className="w-full m-0 fixed bottom-0 lg:static lg:bottom-auto disabled:bg-slate-400 outline-none bg-cyan-600 text-slate-50 shadow-sm   px-2 py-3 mt-5 font-bold" disabled={!!loading}>
            {loading ? (
              <>
                Paying
                {' '}
                {' '}
                <Loading />
              </>
            ) : 'PAY NOW'}
          </button>
        )}
    </form>
  );
}

export default CheckoutForm;
