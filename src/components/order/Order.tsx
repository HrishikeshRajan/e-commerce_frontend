import { useState } from 'react';
import { ORDER_STATUS } from '@/types/Cart';
import { FinalOrder } from '@/types/Orders';
import { useNavigate } from 'react-router-dom';
import { BsArrowRepeat } from 'react-icons/bs';
import LineSmall from '../home/ui/LineSmall';
import cancelOrder from './apis/cancel';
import CancelButton from './ui/cancelBtn';
import ProductImage from './ui/ProductImage';
import Button from '../auth/ui/Button';

function Order({ cartItem }:
{ cartItem:FinalOrder }) {
  const navigate = useNavigate();
  const [item, setItem] = useState<FinalOrder>(cartItem);
  const status = ORDER_STATUS.CANCELED;
  const orderStatus = {
    orderStatus: status,
  };
  const handleCancelOrders = () => {
    cancelOrder(cartItem.cartId, cartItem.product.productId)
      .then(() => setItem({ ...item, ...orderStatus }))
      .catch((error) => console.log(error));
  };

  const redirectToProductPage = () => {
    navigate(`/product/${cartItem.product.productId}`);
  };
  return (
    <div className=" p-3 flex bg-white flex-col rounded-xl shadow-md  w-full">
      <div className="text-xs font-bold text-slate-500 p-2 flex justify-between items-center">
        <span className="font-base flex flex-col md:flex-row">
          <span className="lg:font-semibold text-[.6rem]">Ordered On :</span>
          <span className="text-[.6rem]">{`${new Date(cartItem.orderDate).getDay()}/${new Date(cartItem.orderDate).getMonth()}/${new Date(cartItem.orderDate).getFullYear()}`}</span>
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
        <ProductImage url={cartItem.product.images[0].secure_url} />
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

    </div>
  );
}

export default Order;
