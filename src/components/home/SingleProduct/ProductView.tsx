import React from 'react';
import { useParams } from 'react-router-dom';
import { useSingleProduct } from '@/hooks/useSigleProduct';
import { isEmpty } from 'lodash';
import SingleProduct from './SingleProduct';
import AddToCartButton from '../../cart/AddToCartButton';
import Colors from './ui/Colors';
import Sizes from './ui/Sizes';

function ProductView() {
  const params = useParams();
  const [product, loading, error] = useSingleProduct(params.productId!);
  if (error.error) return;
  if (loading) return;
  if (isEmpty(product)) return;
  return (
    <div className="w-full h-screen flex justify-center container">
      <SingleProduct product={product}>
        <Sizes sizes={product && product.sizes} productId={product._id} />
        <Colors color={product && product.color} productId={product._id} />
        {product.stock < 5 && product.stock > 0 && (
          <div className="my-1">
            <span className="text-red-500 font-bold">
              Huryy Up limited stock is available (
              {product.stock}
              )
            </span>
          </div>
        )}
        {product.stock < 1 && (
          <span className="text-red-500  border-2 p-2 border-red-300 cursor-not-allowed font-bold">
            Product is out of stock
          </span>
        ) }
        {product.stock > 0 && <AddToCartButton /> }

      </SingleProduct>
    </div>
  );
}

export default ProductView;
