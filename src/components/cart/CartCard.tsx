/* eslint-disable react/no-array-index-key */
import { ClientCartItem } from '@/types/Cart';
import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { formattedAmount } from '@/utils/convertToRupees';
import LineSmall from '../home/ui/LineSmall';
import QtyBox from '../dialougeBox/QtyBox';
import SizeBox from '../dialougeBox/SizeBox';
import DeleteItemBtn from './DeleteItemBtn';

function CartCard({ cartItem, cartId }:{ cartItem:ClientCartItem, cartId:string }) {
  const [selectSize, setSelectSize] = useState(false);
  const [selectQty, setSelectQty] = useState(false);

  const { product } = cartItem;
  return (
    <div className={`flex  border  rounded-xl p-2  my-2 shadow-sm justify-start relative ${product.stock < 1 ? 'border-red-500' : 'border-none'}`}>
      <DeleteItemBtn productId={product._id} cartId={cartId} />
      <div className=" w-28 flex items-center  ">
        <img src={product.images[0].secure_url} alt="product" />
      </div>
      <div className="w-6/12 p-2">
        <h1 className="text-xs font-bold text-slate-900">{product.name}</h1>
        <p className="text-slate-500 my-1 text-xs font-base">
          shop:
          {product.shopId.name}
        </p>
        <div className="text-slate-700 text-xs my-2">
          color: &nbsp;
          {cartItem.options.color}
        </div>
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="bg-slate-200 flex w-6/12 p-1 items-center">
            <button type="button" onClick={() => setSelectSize(true)} className="flex text-xs w-full items-center outline-none">
              size:&nbsp;
              {cartItem.options.size}
              <MdKeyboardArrowDown />

            </button>
            { selectSize && (
              <SizeBox
                product={product}
                cartId={cartId}
                currentSize={cartItem.options.size}
                stockAvailable={cartItem.product.stock < cartItem.qty}
                title="Select Size"
                close={setSelectSize}
              />
            )}
          </div>
          <div className="bg-slate-200 flex w-6/12  p-1 items-center">
            <button type="button" onClick={() => setSelectQty(true)} className="flex text-xs w-full items-center  outline-none">
              qty: &nbsp;
              {cartItem.qty}
              <MdKeyboardArrowDown />

            </button>
            {selectQty && (
              <QtyBox
                productId={product._id}
                cartId={cartId}
                qty={cartItem.qty}
                stock={cartItem.product.stock}
                close={setSelectQty}
                title="Select Quantity"
              />
            )}
          </div>
        </div>
        <p className="font-normal my-2">{formattedAmount(cartItem.product.price)}</p>
        {product.stock > 0 ? (
          <div className="font-bold my-2">
            <p className="text-xs text-slate-900 font-base pt-2  ">
              <span className="font-light">GST: </span>
              {`${cartItem.gstInPercentage}%`}
            </p>
            <p className="text-xs text-slate-900 font-base pt-2">
              <span className="font-light">TAX: </span>
              {formattedAmount(cartItem.taxAmount)}
            </p>

            <p className="text-xs text-slate-900 font-base pt-2 hidden ">
              <span className="font-light">Price before tax applied: </span>
              {formattedAmount(cartItem.totalPriceBeforeTax)}
            </p>

            <p className="text-xs text-slate-900 font-base pt-2 hidden ">
              <span className="font-light">Price after tax applied: </span>
              {formattedAmount(cartItem.totalPriceAfterTax)}
            </p>
            <LineSmall />
            <span className="text-slate-950 font-normal pt-2">
              SubTotal:
            </span>
            <span className="text-sm pl-1">
              {formattedAmount(cartItem.totalPriceAfterTax)}
            </span>
          </div>
        ) : <div className="text-red-500 my-2 p-2 font-bold">Out of Stock</div>}

      </div>
    </div>
  );
}

export default CartCard;
