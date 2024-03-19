/* eslint-disable react/require-default-props */
import Ratings from '@/components/products/Ratings';

import React, { ReactNode } from 'react';

import { ProductCore } from '@/types/Product';
import { Offers } from '@/utils/cart.helper';
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

  type SingleProductProps = {
    product:ProductCore
    children:ReactNode
    offers?:Offers
  };

function SingleProduct({ product, offers, children }:SingleProductProps) {
  return (
    <div className="w-full flex flex-col xl:flex-row  lg:justify-center    lg:container">
      <div className="w-full xl:w-6/12  mt-20"><Images src={product.images} /></div>
      <div className="w-full xl:w-6/12 pt-10  lg:pt-1">
        <ProductName name={product.name} />
        <Brand brand={product.brand} />

        <p className="mt-5">
          <Ratings ratings={product.ratings} />
          <CustomerReview numberOfReviews={product.numberOfReviews} />
        </p>
        <LineSmall />

        <div className="flex gap-2">
          <Price price={(offers
            && offers.flashsale
            && Number(offers.flashsale.priceAfterDiscount)) || product.price}
          />
          {offers && offers.flashsale && (
            <>
              <del className="text-slate-400 text-sm ">
                <Price price={product.price} />
              </del>
              <span className="text-slate-400 text-xl font-bold">
                {offers && offers.flashsale && offers.flashsale.discountPercentage}
                {' '}
                OFF
              </span>
            </>
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
        <div>
          <Heading heading="Shop Details" />
          <ShopDetails shop={product.shopId} />
        </div>
      </div>

    </div>
  );
}

export default SingleProduct;
