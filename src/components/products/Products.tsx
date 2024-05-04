/* eslint-disable react/jsx-props-no-spreading */
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import Div from '../CustomElements/Div';
import Card from './Card';
import ProductCardsWrapper from './v2/ProductWrapper';
import ProductsShimmer from '../shimmer/ProductsShimmer';

function Products() {
  const products = useTypedSelector((store) => store.products.userProducts);
  if (!products || (products && products.length < 1)) return <ProductsShimmer />;
  return (
    <Div className=" flex  xl:right-0 xl:w-9/12 w-full  xl:justify-end  ">
      <ProductCardsWrapper className="flex  w-full justify-center  ">
        <Div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xl:grid-cols-4 py-2   place-items-center ">
          {
            products.map((item) => <Card key={item._id} {...item} />)
          }
        </Div>
      </ProductCardsWrapper>
    </Div>
  );
}

export default Products;
