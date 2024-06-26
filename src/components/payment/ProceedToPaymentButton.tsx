import Button from '@/components/auth/ui/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrderId } from '@/utils/reduxSlice/orderSlice';
import { ClientOrder } from '@/types/Orders';
import orderHelper from '@/utils/order.helper';
import { notifyError } from '@/utils/toast';
import { isFetchSuccess } from '@/types/Fetch';
import { ToastContainer, toast } from 'react-toastify';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import { placeOrder } from '../cart/apis/placeOrder';
import 'react-toastify/dist/ReactToastify.css';
import { hasOrder } from '.';

function ProceedToPaymentButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const orderData = useTypedSelector((store) => store.order.order) as ClientOrder;
  const cartData = useTypedSelector((store) => store.cart.cart);
  const createOrderAndRedirectToPayment = () => {
    setLoading(true);

    try {
      if (!cartData || !orderData) {
        throw new Error('Oops, something went wrong. Please try again');
      }
      if (!orderData.shippingAddress
         || (orderData.shippingAddress && !orderData.shippingAddress._id)) {
        throw new Error('Please select an shipping address');
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
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message, {
          position: 'bottom-center',
        });
      }
    }
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
      <>
        <Button
          type="button"
          onClick={createOrderAndRedirectToPayment}
          className="bg-yellow-400 w-full lg:w-6/12 font-bold rounded text-slate-900 p-3"
          mode="idle"
          disabled={false}
        >
          PROCEED TO PAYMENT
        </Button>
        <ToastContainer position="bottom-center" />
      </>
    )
  );
}

export default ProceedToPaymentButton;
