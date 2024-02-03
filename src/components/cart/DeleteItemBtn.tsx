import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { removeUser } from '@/utils/reduxSlice/appSlice';
import axios, { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useNavigate } from 'react-router-dom';
import AuthHelper from '../auth/apis/helper';
import { deleteCartItemByIds } from './apis/deleteCartItem';

function DeleteItemBtn({ productId, cartId }:{ productId:string, cartId:string }) {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const deleteCartItem = () => {
    deleteCartItemByIds(productId, cartId)
      .then((result) => {
        if (result.status === StatusCodes.OK) {
          const updatedCart = cart.deleteProductById(productId);
          dispatch(addToCart(updatedCart!));
        }
      })
      .catch((error:any) => {
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
    <button type="button" aria-label="Delete Cart Item" onClick={() => deleteCartItem()} className="absolute top-0 right-0 p-2"><RxCross2 /></button>

  );
}

export default DeleteItemBtn;
