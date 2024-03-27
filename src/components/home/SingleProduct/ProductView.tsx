import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSingleProduct } from '@/hooks/useSigleProduct';
import { isEmpty } from 'lodash';
import { MdStars } from 'react-icons/md';
import { formattedAmount } from '@/utils/convertToRupees';
import SingleProduct from './SingleProduct';
import AddToCartButton from '../../cart/AddToCartButton';
import Colors from './ui/Colors';
import Sizes from './ui/Sizes';
import { OfferProps } from '.';

const isOfferActive = (startTime:string, endTime:string) => {
  const current = new Date();
  return (current > new Date(startTime) && current < new Date(endTime));
};
function Offers({ offers }:{ offers:OfferProps }) {
  return (
    <div className="mt-10  p-2 border-orange-200 border-2 rounded-xl">
      <div className="flex justify-start items-center gap-2  ">
        <span className="text-yellow-500 scale-150"><MdStars /></span>

        <h1 className="font-bold text-cyan-400 ">

          Offers
        </h1>

      </div>
      <div>
        {offers.coupons && (
          <div>
            <h3 className="text-orange-500 font-semibold  px-1 py-2">Coupons</h3>
            <div className="px-1 flex flex-col font-semibold text-slate-900 gap-y-1">
              {offers.coupons.map((coupon) => (
                isOfferActive(coupon.startTime, coupon.endTime) && (
                  <Link to="/coupons" key={coupon._id}>
                    {coupon.offername}
                    {coupon.type === 'PERCENTAGE' && `${coupon.discountPercentage}% OFF`}
                    {coupon.type === 'FLAT' && ` FLAT ${formattedAmount(coupon.discountAmount!)} OFF`}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
        {offers.vouchers && (
          <div>
            <h3 className="text-orange-500 font-semibold px-1 py-2">Coupons</h3>
            <ul className="px-1">
              {offers.vouchers.map((voucher) => <li key={voucher._id}>{voucher.offername}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductView() {
  const params = useParams();
  const [response, loading, error] = useSingleProduct(params.productId!);
  if (error.error) return;
  if (loading) return;
  if (isEmpty(response)) return;
  return (
    <div className="w-full h-screen flex justify-center container">
      <SingleProduct product={response.product}>
        <Sizes
          sizes={response.product && response.product.sizes}
          productId={response.product._id}
        />
        <Colors
          color={response.product && response.product.color}
          productId={response.product._id}
        />
        {response.product.stock < 5 && response.product.stock > 0 && (
          <div className="my-1">
            <span className="text-red-500 font-bold">
              Huryy Up limited stock is available (
              {response.product.stock}
              )
            </span>
          </div>
        )}
        {response.product.stock < 1 && (
          <span className="text-red-500  border-2 p-2 border-red-300 cursor-not-allowed font-bold">
            Product is out of stock
          </span>
        ) }
        {response.product.stock > 0 && <AddToCartButton /> }
        {response.offers && <Offers offers={response.offers} /> }

      </SingleProduct>
    </div>
  );
}

export default ProductView;
