/* eslint-disable react/require-default-props */

import {
  lazy, ReactNode, Suspense, useState,
} from 'react';

import { ProductCore } from '@/types/Product';
import { Offers } from '@/utils/cart.helper';
import { formattedAmount } from '@/utils/convertToRupees';
import { getFinalAmount } from '@/utils/discounts/offer.helper';
import useFetchProductReviews from '@/hooks/useFetchProductReviews';
import Line from '../ui/Line';
import Brand from './ui/Brand';
import ProductName from './ui/ProductName';
import LineSmall from '../ui/LineSmall';
import CustomerReview from './ui/CustomerReview';
import Price from './ui/Price';
import Description from './ui/Description';
import DetailsItem from './ui/DetailsItem';
import Heading from './ui/Heading';
import ShopDetails from './ui/ShopDetails';
import Images from './Images';

const ReviewWrapper = lazy(() => import('../reviews/ReviewWrapper'));
const Ratings = lazy(() => import('@/components/products/Ratings'));

  type SingleProductProps = {
    product:ProductCore
    children:ReactNode
    offers?:Offers
  };

function SingleProduct({ product, offers, children }:SingleProductProps) {
  const [page] = useState(1);
  const { fetchUserReviewsError } = useFetchProductReviews(product._id, page);
  return (
    <div>
      <div className="w-full flex flex-col xl:flex-row  lg:justify-center   lg:container">
        <div className="w-full xl:w-6/12  mt-20"><Images src={product.images} /></div>
        <div className="w-full  xl:w-6/12 pt-10 px-2 lg:pt-1">
          <ProductName name={product.name} />
          <Brand brand={product.brand} />
          <p className="mt-5">
            <Suspense fallback={<span className="w-4/12 h-10 bg-slate-200" />}>
              <Ratings ratings={product.ratings} />
            </Suspense>
            {product.numberOfReviews ? <CustomerReview numberOfReviews={product.numberOfReviews} /> : <span className="px-1 text-slate-400">(0) Not rated</span>}
          </p>
          <LineSmall />

          <div className="flex gap-2">
            {(!offers || (offers && !offers.flashsale)) && (
              <Price price={product.price} />
            )}
            {offers && offers.flashsale && (
              <span className="text-slate-600 text-base flex gap-2 items-center font-bold">
                {offers && offers.flashsale
               && formattedAmount(getFinalAmount(product, offers.flashsale, 12))}
                <del className="text-slate-400 text-xs ">
                  <Price price={product.price} />
                </del>
                {offers.flashsale.discountPercentage}
                % OFF
              </span>
            )}

          </div>
          <Description description={product.description} />
          {children}
          <Line />
          <div>
            <Heading heading="Product Details" />
            <ul className="text-slate-900">
              <DetailsItem name="Category">
                {product.category}
              </DetailsItem>
              <DetailsItem name="Gender">
                {product.gender}
              </DetailsItem>
              <DetailsItem name="Product Discontinued">
                {JSON.stringify(product.isDiscontinued)}
              </DetailsItem>
            </ul>
          </div>
          <LineSmall />
          {product.shopId && (
            <div>
              <Heading heading="Shop Details" />
              <ShopDetails shop={product.shopId} />
            </div>
          )}

        </div>

      </div>
      {!fetchUserReviewsError && (
        <Suspense fallback={<div className="w-full h-40 bg-red-400">Loading</div>}>
          <ReviewWrapper page={page} />
        </Suspense>
      )}
    </div>
  );
}

export default SingleProduct;
