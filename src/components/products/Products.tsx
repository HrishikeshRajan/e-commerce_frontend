/* eslint-disable react/jsx-props-no-spreading */
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import Card from './Card';
import ProductsShimmer from '../shimmer/ProductsShimmer';

function Products() {
  const products = useTypedSelector((store) => store.products.userProducts);
  if (!products || (products && products.length < 1)) return <ProductsShimmer />;
  return (
    <div className="w-full flex sm:gap-2 justify-start">
      {
        products.map((item) => <Card key={item._id} {...item} />)
      }
    </div>
  );
}

export default Products;
