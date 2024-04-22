import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { clearCart } from '@/utils/reduxSlice/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { deleteCart } from './apis/deleteCart';
import Button from '../auth/ui/Button';
import Modal from '../dialougeBox/Modal';

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
      }).catch((error) => {
        toast.error((error as Error).message);
      });
    }
    cart.clearCart();
    dispatch(clearCart());

    navigate('/');
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <Button
        mode="idle"
        className="rounded-xl text-xs px-2 h-10 bg-gray-900 text-white font-semibold shadow-md"
        type="button"
        disabled={false}
        onClick={toggleModal}
      >
        Clear Cart
      </Button>
      {isModalOpen && (
        <Modal className="rounded-xl border-2 w-6/12" togglerFn={toggleModal}>
          <p className="py-4 text-slate-500 font-semibold">Are you sure that you want to clear your cart?</p>
          <div className="flex gap-2 ">
            <button
              onClick={() => {
                toggleModal();
              }}
              className="border-2 px-4 py-2 rounded-xl bg-green-600 text-white font-bold"
              type="button"
            >
              Cancel
            </button>
            <button onClick={handleClearCart} className="border-2 px-4 py-2 rounded-xl bg-red-600 font-bold text-white" type="button">Clear</button>

          </div>
        </Modal>
      )}
    </>
  );
}

export default ClearCartBtn;
