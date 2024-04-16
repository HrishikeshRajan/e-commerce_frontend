import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { clearCart } from '@/utils/reduxSlice/cartSlice';
import axios, { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { removeUser } from '@/utils/reduxSlice/appSlice';
import { useNavigate } from 'react-router-dom';
import { deleteCart } from './apis/deleteCart';
import AuthHelper from '../auth/apis/helper';
import Button from '../auth/ui/Button';

function ClearCartBtn({ cartId }:{ cartId:string }) {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const user = useTypedSelector((store) => store.app.user);
  const handleClearCart = () => {
    if (cartId && (user && Object.values(user).length > 0)) {
      deleteCart(cartId).then((result) => {
        if (result.status === 200) {
          dispatch(clearCart());

          navigate('/');
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
    }
    cart.clearCart();
    dispatch(clearCart());
    navigate('/');
  };
  return (
    <Button
      mode="idle"
      className="rounded-xl text-xs px-2 h-10 bg-gray-900 text-white font-semibold shadow-md"
      type="button"
      disabled={false}
      onClick={() => handleClearCart()}
    >
      Clear Cart
    </Button>
  );
}

export default ClearCartBtn;
