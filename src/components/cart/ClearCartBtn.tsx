import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { clearCart } from '@/utils/reduxSlice/cartSlice';
import React from 'react';
import axios, { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { removeUser } from '@/utils/reduxSlice/appSlice';
import { useNavigate } from 'react-router-dom';
import { deleteCart } from './apis/deleteCart';
import AuthHelper from '../auth/apis/helper';

function ClearCartBtn({ cartId }:{ cartId:string }) {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const handleClearCart = () => {
    deleteCart(cartId).then((result) => {
      if (result.status === 200) {
        cart.clearCart();
        dispatch(clearCart());
      }
    }).catch((error:any) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === StatusCodes.UNAUTHORIZED) {
          AuthHelper.clearSignedOnData();
          dispatch(removeUser());
          navigate('/auth');
        }
      }
    });
  };
  return (
    <button type="button" onClick={() => handleClearCart()} className="p-2 text-slate-900 font-base">Clear Cart</button>
  );
}

export default ClearCartBtn;
