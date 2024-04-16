/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import { ClientCartItem } from '@/types/Cart';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { formattedAmount } from '@/utils/convertToRupees';
import QtyBox from '../dialougeBox/QtyBox';
import SizeBox from '../dialougeBox/SizeBox';
import DeleteItemBtn from './DeleteItemBtn';
import { OfferProps } from '../home/SingleProduct';
import CouponDiscount from './CouponDiscount';

export const isFlashSaleActive = (startTime:Date, endTime:Date) => {
  const current = new Date().toString();
  const start = new Date(startTime).toString();
  const end = new Date(endTime).toString();

  if (current > start && current < end) {
    return true;
  }
  return false;
};

export function isCouponExists(offer:OfferProps | undefined) {
  if (!offer) return false;
  if (!offer.coupons) return false;
  if (offer.coupons.length < 1) return false;
  return true;
}

function CartCard({ cartItem, cartId }:{ cartItem:ClientCartItem, cartId:string }) {
  const [selectSize, setSelectSize] = useState(false);
  const [selectQty, setSelectQty] = useState(false);
  const { product } = cartItem;
  return (
    <div className={`flex  border  rounded-xl p-2  my-2 shadow-sm justify-start relative ${product.stock < 1 ? 'border-red-500' : 'border-none'}`}>
      <DeleteItemBtn
        productId={product._id}
        cartId={cartId}
      />
      <div className=" w-28 flex items-center  ">
        <img src={product.images[0].secure_url} alt="product" />
      </div>
      <div className="w-6/12 p-2">
        <h1 className="text-xs font-bold text-slate-900">{product.name}</h1>

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
        <div className="font-normal my-2">

          {/** Merge flashsale to input form */}

          {/** Show discoutn only when discount is applied */}

          {/* one coupon per transaction. So remove the array from appliesCoupons */}
          {cartItem.appliedOffer && cartItem.appliedOffer.method === 'FLASHSALE' && <CouponDiscount coupon={cartItem.appliedOffer} />}
          {cartItem.appliedOffer && cartItem.appliedOffer.method === 'COUPON' && <CouponDiscount coupon={cartItem.appliedOffer} />}
          {!cartItem.appliedOffer && (
            <span className="text-slate-700 font-semibold">
              <small className="text-slate-500 ">MRP </small>
              {formattedAmount(cartItem.totalPrice)}
            </span>
          ) }
        </div>

        {product.stock > 0 ? <div className="text-green-500 text-xs  ">In Stock</div> : <div className="text-red-500 text-xs font-bold">Out of Stock</div>}

      </div>
    </div>
  );
}

export default CartCard;
