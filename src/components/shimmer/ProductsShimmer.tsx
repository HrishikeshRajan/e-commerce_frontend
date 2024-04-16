/* eslint-disable react/no-array-index-key */
import ProductCard from './ProductCard';

function ProductsShimmer() {
  return (
    <div className="w-full flex flex-wrap  justify-center">
      { Array.from({ length: 20 }).map((_, index) => <ProductCard key={index} />)}

    </div>
  );
}

export default ProductsShimmer;
