/* eslint-disable max-len */
import { useState } from 'react';
import { ORDER_STATUS } from '@/types/Cart';
import { FinalOrder } from '@/types/Orders';
import { useNavigate } from 'react-router-dom';
import { BsArrowRepeat } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { IoIosClose } from 'react-icons/io';
import { defaultCamera } from '@/utils/cloudinaryUrls';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import LineSmall from '../home/ui/LineSmall';
import cancelOrder from './apis/cancel';
import CancelButton from './ui/cancelBtn';
import ProductImage from './ui/ProductImage';
import Button from '../auth/ui/Button';
import Modal from '../dialougeBox/Modal';
import H2 from '../CustomElements/Headings/H2';
import CreateForm from '../home/reviews/ui/CreateForm';

function Order({ cartItem }:
{ cartItem:FinalOrder }) {
  const navigate = useNavigate();
  const [item, setItem] = useState<FinalOrder>(cartItem);
  const status = ORDER_STATUS.CANCELED;
  const orderStatus = {
    orderStatus: status,
  };

  const user = useTypedSelector((store) => store.app.user);
  const handleCancelOrders = () => {
    cancelOrder(cartItem.cartId, cartItem.product.productId)
      .then(() => setItem({ ...item, ...orderStatus }))
      .catch((error) => console.log(error));
  };

  const redirectToProductPage = () => {
    navigate(`/product/${cartItem.product.productId}`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className=" p-3 flex bg-white flex-col rounded-xl shadow-md  w-full">
        <div className="text-xs font-bold text-slate-500 p-2 flex justify-between items-center">
          <span className="font-base flex flex-col md:flex-row">
            {/* <span className="lg:font-semibold text-[.6rem]">Ordered On :</span> */}
            {/* <span className="text-[.6rem]">{`${new Date(cartItem.orderDate).getDay()}/${new Date(cartItem.orderDate).getMonth() + 1}/${new Date(cartItem.orderDate).getFullYear()}`}</span> */}
          </span>
          <div className="p-1">
            <small className="text-slate-500">Order   Status : </small>
            <span className={`font-bold  p-1 ${item.orderStatus === ORDER_STATUS.CANCELED ? ' text-red-500' : ' text-green-600'} rounded `}>
              {item.orderStatus}
            </span>
          </div>

        </div>
        <LineSmall />
        <div className="flex items-center">
          <ProductImage url={cartItem?.product?.images[0]?.secure_url || defaultCamera} />
          <div className="flex flex-col justify-center">
            <h1 className="text-sm font-semibold text-slate-700 p-1">{item.product.name}</h1>
            <h4 className="text-slate-500 text-sm p-1">{item.product.brand}</h4>
            <span className="text-slate-500 text-sm p-1">
              Qty:
              {' '}
              {item.qty}
            </span>
            <span className="text-slate-500 text-sm p-1">
              Size:
              {' '}
              {' '}
              {item.options.size}
            </span>
            <span className="text-slate-500 text-sm p-1">
              color:
              {item.options.color}
            </span>
            <div className="flex gap-3 mt-1">
              {item.orderStatus !== ORDER_STATUS.CANCELED
             && <CancelButton handleCancelOrders={handleCancelOrders} /> }
              {(item.orderStatus === ORDER_STATUS.CANCELED
            || item.orderStatus === ORDER_STATUS.DELIVERED)
             && (
               <Button
                 type="button"
                 mode="idle"
                 disabled={false}
                 onClick={redirectToProductPage}
                 className=" bg-green-500  flex items-center gap-2 rounded-xl shadow-md px-2 py-1 font-semibold text-white active:scale-105 hover:scale-105 transition delay-10 duration-300 ease-in-out"
               >
                 <BsArrowRepeat />
                 {' '}
                 Reorder
               </Button>
             )}
            </div>

          </div>

        </div>
        <hr className="h-px mt-5 bg-gray-200 border-0" />
        <button type="button" onClick={toggleModal} className=" text-slate-500 flex items-center gap-4 mt-2">
          Write a product review
          {' '}
          <MdKeyboardArrowRight />
        </button>
      </div>
      {isModalOpen && (
        <Modal className="rounded-xl flex flex-col py-10 px-5" togglerFn={toggleModal}>

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
          <H2 className="text-md text-slate-800 my-2 font-bold text-left">Product Review</H2>
          <div className="flex items-center gap-2 my-2">
            <ProductImage
              url={cartItem?.product?.images[0]?.secure_url || defaultCamera}
              className="w-10 h-10 my-5"
            />
            <h1 className="text-sm font-semibold text-slate-700 p-1 truncate">{item.product.name}</h1>
          </div>

          <CreateForm productId={item.product.productId} userId={user?._id} cancel={toggleModal} />
        </Modal>
      )}
    </>
  );
}

export default Order;
