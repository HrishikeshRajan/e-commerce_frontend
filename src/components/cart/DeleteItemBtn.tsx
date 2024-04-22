/* eslint-disable no-constant-condition */
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import {
  deleteCartItem, updateGrandTotalPrice, updateGrandTotalQty,
} from '@/utils/reduxSlice/cartSlice';
import { RxCross2 } from 'react-icons/rx';
import { StatusCodes } from 'http-status-codes';
import { ToastContainer, toast } from 'react-toastify';
import { deleteCartItemByIds } from './apis/deleteCartItem';
import Button from '../auth/ui/Button';
import 'react-toastify/dist/ReactToastify.css';

type DeleteItemBtnProps = { productId:string, cartId:string, productName:string };
function DeleteItemBtn({ productId, cartId, productName }:DeleteItemBtnProps) {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((store) => store.app.user);

  const deleteCartItemById = () => {
    if (cartId && (user && Object.values(user).length > 0)) {
      deleteCartItemByIds(productId, cartId)
        .then((result) => {
          if (result.status === StatusCodes.OK) {
            dispatch(deleteCartItem({ productId }));
            dispatch(updateGrandTotalQty());
            dispatch(updateGrandTotalPrice());
            toast.success(`${productName} deleted successfully`);
          }
        })
        .catch(() => {
          toast.error(`${productName} deleted failed`);
        });
    } else {
      dispatch(deleteCartItem({ productId }));
      dispatch(updateGrandTotalQty());
      dispatch(updateGrandTotalPrice());
      toast.success(`${productName} deleted successfully`);
    }
  };
  return (
    <>
      <Button
        mode="idle"
        className="absolute top-0 right-0 p-2"
        type="button"
        disabled={false}
        onClick={() => deleteCartItemById()}
      >
        <RxCross2 />
      </Button>
      <ToastContainer hideProgressBar />
    </>
  );
}

export default DeleteItemBtn;
