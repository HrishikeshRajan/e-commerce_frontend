/* eslint-disable react/no-array-index-key */
import ProductCard from './ProductCard';

function ProductsShimmer() {
  return (
    <div className="w-full flex  top-full mt-28 flex-wrap justify-center xl:justify-end">
      <div className=" grid grid-cols-2 sm:grid-cols-4 gap-2 xl:grid-cols-4 py-2   place-items-center ">
        { Array.from({ length: 20 }).map((_, index) => <ProductCard key={index} />)}
      </div>

    </div>
  );
}

export default ProductsShimmer;
