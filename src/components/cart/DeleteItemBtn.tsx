/* eslint-disable no-constant-condition */
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { addToCart } from '@/utils/reduxSlice/cartSlice';
import { RxCross2 } from 'react-icons/rx';
import { StatusCodes } from 'http-status-codes';
import { ToastContainer, toast } from 'react-toastify';
import { deleteCartItemByIds } from './apis/deleteCartItem';
import Button from '../auth/ui/Button';
import 'react-toastify/dist/ReactToastify.css';

function DeleteItemBtn({ productId, cartId }:{ productId:string, cartId:string }) {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((store) => store.app.user);
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
        .catch((error) => {
          toast.error((error as Error).message);
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
