import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { clearCart } from '@/utils/reduxSlice/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { IoIosClose } from 'react-icons/io';
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
        <Modal className="rounded-xl flex flex-col py-10 px-5 " togglerFn={toggleModal}>
          <button
            aria-label="close modal"
            onClick={() => {
              toggleModal();
            }}
            className="absolute hover:scale-150 font-bold transition ease-linear top-0 p-2 right-0 "
            type="button"
          >
            <IoIosClose size={20} />
          </button>
          <MdRemoveShoppingCart size={42} className="text-slate-400 mx-auto" />
          <p className="py-4 text-slate-500 font-semibold text-center mx-auto">Are you sure you want to clear your cart?</p>
          <div className="flex gap-2  mx-auto">
            <button
              onClick={() => {
                toggleModal();
              }}
              className="px-4 outline-none border-none py-2 rounded-xl shadow-md shadow-green-400 bg-green-600 text-white font-bold"
              type="button"
            >
              Cancel
            </button>
            <button onClick={handleClearCart} className="px-4 py-2 rounded-xl outline-none border-none shadow-md shadow-red-400 bg-red-600 font-bold text-white" type="button">Clear Cart</button>

          </div>
        </Modal>
      )}
    </>
  );
}

export default ClearCartBtn;
