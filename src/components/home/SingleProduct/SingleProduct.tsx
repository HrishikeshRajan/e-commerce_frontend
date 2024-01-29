import Ratings from '@/components/products/Ratings';
import { useSingleProduct } from '@/hooks/useSigleProduct';

import React from 'react';
import { useParams } from 'react-router-dom';

import Line from '../ui/Line';
import Brand from './ui/Brand';
import ProductName from './ui/ProductName';
import LineSmall from '../ui/LineSmall';
import CustomerReview from './ui/CustomerReview';
import Price from './ui/Price';
import Description from './ui/Description';
import Sizes from './ui/Sizes';
import Colors from './ui/Colors';
import AddToCartButton from './ui/AddToCartButton';
import DetailsItem from './ui/DetailsItem';
import Heading from './ui/Heading';
import ShopDetails from './ui/ShopDetails';
import Images from './Images';

function SingleProduct() {
  const params = useParams();
  const [product, loading] = useSingleProduct(params.prodId!);

  if (!product) return;
  if (loading) return <h1>Loading</h1>;
  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-center items-center lg:mt-44 lg:container">
      <div className="w-full lg:w-5/12"><Images src={product.images} /></div>
      <div className="w-full lg:w-7/12 pt-10 lg:pt-72">
        <ProductName name={product.name} />
        <Brand brand={product.brand} />

        <p className="mt-5">
          <Ratings ratings={product.ratings} />
          <CustomerReview numberOfReviews={product.numberOfReviews} />
        </p>
        <LineSmall />
        <Price price={product.price} />
        <Description description={product.description} />
        <Sizes sizes={product.sizes} />
        <Colors color={product.color} />
        <div className="my-10">
          <AddToCartButton />
        </div>
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
