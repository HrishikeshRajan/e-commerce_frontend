/* eslint-disable react/no-array-index-key */
import { Item } from '@/types/Cart';
import { formattedAmount } from '@/utils/convertToRupees';
import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import LineSmall from '../home/ui/LineSmall';
import QtyBox from '../dialougeBox/QtyBox';
import SizeBox from '../dialougeBox/SizeBox';
import DeleteItemBtn from './DeleteItemBtn';

function CartCard({ cartItem }:{ cartItem:Item }) {
  const [selectSize, setSelectSize] = useState(false);
  const [selectQty, setSelectQty] = useState(false);

  const { product } = cartItem;

  return (
    <div className="flex  border   my-2 shadow-sm justify-start relative">
      <DeleteItemBtn productId={product._id} />
      <div className=" w-28 flex items-center  ">
        <img src={product.images[0].secure_url} className="" alt="product" />
      </div>
      <div className="w-6/12 p-2">
        <h1 className="text-xs font-bold text-slate-900">{product.name}</h1>
        <p className="text-slate-500 my-1 text-xs font-thin">
          shop:
          {product.shopId.name}
        </p>
        <div className="text-slate-500 text-xs my-1">
          color:
          {cartItem.options.color}
        </div>
        <div className="flex gap-2">
          <div className="bg-slate-200 flex w-fit p-1 items-center">
            <button type="button" onClick={() => setSelectSize(true)} className="flex text-xs items-center outline-none">
              size
              {' '}
              {cartItem.options.size}
              <MdKeyboardArrowDown />

            </button>
            {selectSize && (
              <SizeBox
                product={product}
                currentSize={cartItem.options.size}
                title="Select Size"
                close={setSelectSize}
              />
            )}
          </div>
          <div className="bg-slate-200 flex w-fit p-1 items-center">
            <button type="button" onClick={() => setSelectQty(true)} className="flex text-xs items-center outline-none">
              qty
              {' '}
              {cartItem.qty}
              <MdKeyboardArrowDown />

            </button>
            {selectQty && (
              <QtyBox
                productId={product._id}
                qty={cartItem.qty}
                close={setSelectQty}
                title="Select Quantity"
              />
            )}
          </div>
        </div>
        <p className="font-normal my-2">{formattedAmount(product.price)}</p>
        <LineSmall />
        <p className="font-bold my-2">
          <span className="text-slate-950 font-light">
            SubTotal
            {' '}
          </span>
          <span className="text-sm">
            {' '}
            {formattedAmount(cartItem.totalPrice)}
          </span>
        </p>

      </div>
    </div>
  );
}

export default CartCard;
