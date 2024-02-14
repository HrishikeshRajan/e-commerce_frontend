/* eslint-disable react/no-array-index-key */
import { CartItemDocument } from '@/types/Cart';
import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { formattedAmount } from '@/utils/convertToRupees';
import LineSmall from '../home/ui/LineSmall';
import QtyBox from '../dialougeBox/QtyBox';
import SizeBox from '../dialougeBox/SizeBox';
import DeleteItemBtn from './DeleteItemBtn';

function CartCard({ cartItem, cartId }:{ cartItem:CartItemDocument, cartId:string }) {
  const [selectSize, setSelectSize] = useState(false);
  const [selectQty, setSelectQty] = useState(false);

  const { productId } = cartItem;
  return (
    <div className="flex  border  rounded p-2  my-2 shadow-sm justify-start relative">
      <DeleteItemBtn productId={productId._id} cartId={cartId} />
      <div className=" w-28 flex items-center  ">
        <img src={productId.images[0].secure_url} className="" alt="product" />
      </div>
      <div className="w-6/12 p-2">
        <h1 className="text-xs font-bold text-slate-900">{productId.name}</h1>
        <p className="text-slate-500 my-1 text-xs font-thin">
          shop:
          {productId.shopId.name}
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
                product={productId}
                cartId={cartId}
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
                productId={productId._id}
                cartId={cartId}
                qty={cartItem.qty}
                close={setSelectQty}
                title="Select Quantity"
              />
            )}
          </div>
        </div>
        <p className="font-normal my-2">{formattedAmount(cartItem.productId.price)}</p>
        <LineSmall />
        <p className="font-bold my-2">
          <h3 className="text-xs text-slate-900 font-base">
            <span className="font-light">tax: </span>
            {' '}
            {' '}
            {formattedAmount(cartItem.taxAmount)}
          </h3>
          <h3 className="text-xs text-slate-900 font-base pt-2">
            <span className="font-light">Price before tax applied: </span>
            {formattedAmount(cartItem.totalPriceBeforeTax)}
          </h3>
          <h3 className="text-xs text-slate-900 font-base pt-2">
            <span className="font-light">Price after tax applied: </span>
            {cartItem.totalPriceAfterTaxString}
          </h3>
          <LineSmall />
          <span className="text-slate-950 font-normal pt-2">
            SubTotal
            {' '}
          </span>
          <span className="text-sm">
            {' '}
            {cartItem.totalPriceAfterTaxString}
          </span>
        </p>

      </div>
    </div>
  );
}

export default CartCard;
