import React from 'react';
import ProductCard from './ProductCard';

function ProductsShimmer() {
  return (
    <div className="w-full flex flex-wrap  justify-center">
      { Array.from({ length: 20 }).map((val, index) => <ProductCard key={index} />)}

    </div>
  );
}

export default ProductsShimmer;
