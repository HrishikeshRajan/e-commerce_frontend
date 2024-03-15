import Button from '@/components/auth/ui/Button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrderId } from '@/utils/reduxSlice/orderSlice';
import { ClientCart } from '@/types/Cart';
import { ClientOrder } from '@/types/Orders';
import orderHelper from '@/utils/order.helper';
import { notifyError } from '@/utils/toast';
import { isFetchSuccess } from '@/types/Fetch';
import { placeOrder } from '../cart/apis/placeOrder';
import 'react-toastify/dist/ReactToastify.css';
import { hasOrder } from '.';

function ProceedToPaymentButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const createOrderAndRedirectToPayment = () => {
    setLoading(true);
    const cartData = (JSON.parse(localStorage.getItem('cart') as string) as unknown as ClientCart);
    const orderData = (JSON.parse(localStorage.getItem('order') as string) as unknown as ClientOrder);

    if (!cartData || !orderData) {
      return navigate(-1);
    }
    placeOrder(cartData.cartId!, orderData).then((result) => {
      setLoading(false);
      if (isFetchSuccess(result)) {
        if (hasOrder(result.message.order)) {
          dispatch(addOrderId(result.message.order.orderId));
          orderHelper.addOrderId(result.message.order.orderId);
          navigate('/payment');
        }
      } else {
        setLoading(false);
        notifyError(result.error);
      }
    }).catch((err:unknown) => {
      setLoading(false);
      notifyError((err as Error).message);
    });
  };
  return (
    loading ? (
      <Button
        type="button"
        className="bg-slate-300 w-full lg:w-6/12 font-bold rounded text-slate-900 p-3"
        mode="loading"
        disabled
        loadingAnimation
      >
        Please wait
      </Button>
    ) : (
      <Button
        type="button"
        onClick={createOrderAndRedirectToPayment}
        className="bg-yellow-400 w-full lg:w-6/12 font-bold rounded text-slate-900 p-3"
        mode="idle"
        disabled={false}
      >
        PROCEED TO PAYMENT
      </Button>
    )
  );
}

export default ProceedToPaymentButton;
