import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import orderHelper from '@/utils/order.helper';
import cart from '@/utils/cart.helper';
import { clearCart } from '@/utils/reduxSlice/cartSlice';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { clearAddressId, clearOrderId } from '@/utils/reduxSlice/orderSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    cart.clearCart();
    orderHelper.clearOrderId();
    orderHelper.clearOrder();

    dispatch(clearCart());
    dispatch(clearOrderId());
    dispatch(clearAddressId());
  }, [dispatch]);

  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className="w-full h-screen mt-10  flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center shadow-sm rounded border-2 p-10">
        <FontAwesomeIcon icon={faCircleCheck} size="5x" className="text-green-500 animate-pulse" />
        <h2 className="text-bold text-slate-700 p-3">Payment Successfull</h2>
        <h3 className="font-bold text-slate-800 text-xl mb-10 p-3">Your order has been placed!</h3>
        <Link to="/myOrders" className="font-semibold p-3 border-2 rounded outline-none">
          View Orders
        </Link>
        <span className="font-semibold text-slate-600 p-3">or</span>
        <button type="button" className="p-5 rounded bg-yellow-400 text-slate-900 font-semibold outline-none" onClick={handleClick}>CONTINUE SHOPPING</button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
