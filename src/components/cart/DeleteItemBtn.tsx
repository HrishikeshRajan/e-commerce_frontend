/* eslint-disable no-constant-condition */
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import { RxCross2 } from 'react-icons/rx';
import { removeUser } from '@/utils/reduxSlice/appSlice';
import axios, { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AuthHelper from '../auth/apis/helper';
import { deleteCartItemByIds } from './apis/deleteCartItem';
import Button from '../auth/ui/Button';
import 'react-toastify/dist/ReactToastify.css';

function DeleteItemBtn({ productId, cartId }:{ productId:string, cartId:string }) {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((store) => store.app.user);
  const navigate = useNavigate();
  const notify = () => toast('Deleted successfully');

  const deleteCartItem = () => {
    if (cartId && (user && Object.values(user).length > 0)) {
      deleteCartItemByIds(productId, cartId)
        .then((result) => {
          if (result.status === StatusCodes.OK) {
            const updatedCart = cart.clearItemFromLocalStoarge(productId);
            dispatch(addToCart(updatedCart!));
            notify();
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
    }
    const updatedCart = cart.clearItemFromLocalStoarge(productId);
    dispatch(addToCart(updatedCart!));
    notify();
  };
  return (
    <>
      <Button
        mode="idle"
        className="absolute top-0 right-0 p-2"
        type="button"
        disabled={false}
        onClick={() => deleteCartItem()}
      >
        <RxCross2 />
      </Button>
      <ToastContainer hideProgressBar />
    </>
  );
}

export default DeleteItemBtn;
