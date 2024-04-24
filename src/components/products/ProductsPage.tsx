/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

import useFilter from '@/hooks/useFilter';
import { useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import useProductsQuery from '@/hooks/user/useProductsQuery';
import Pagination from './Pagination';
import Div from '../CustomElements/Div';
import FilterBox from '../home/sidebar/FilterBox';
import FilterShimmer from '../shimmer/FilterShimmer';
import Sort from '../home/filter/Sort';
import Card from './Card';
import ProductsShimmer from '../shimmer/ProductsShimmer';
import ProductCardsWrapper from './v2/ProductWrapper';
import ProductNotFoundError from './ProductNotFoundError';

function ProductsPage() {
  const { filter, loading } = useFilter();
  const [isOpen, setIsOpen] = useState(false);
  const [page] = useState(1);

  const [searchParams] = useSearchParams();
  const products = useTypedSelector((store) => store.products.userProducts);
  const {
    productsLoading, hasMore,
  } = useProductsQuery(page, searchParams);
  if (loading) return <ProductsShimmer />;

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  if (!productsLoading && !hasMore) {
    return <ProductNotFoundError />;
  }
  return (

    <Div className="w-full relative ">
      <Div className="w-full container  top-full mt-28  flex justify-end">
        <Sort />
      </Div>

      {filter && !loading
    && (
      <Div className={`fixed left-0 xl:hidden bg-white right-0 bottom-0 rounded-xl  delay-75 duration-150 ease overflow-y-auto  z-40  xl:bottom-10 xl:left-0 ${isOpen ? 'h-full ' : 'h-20'}`}>
        <FilterBox filter={filter} toggleButton={toggleBottomSheet} isOpen={isOpen} />
      </Div>
    )}
      <Div className="flex justify-end">
        {filter && !loading
          ? (
            <Div className="fixed bg-white w-3/12 left-0 top-15 hidden xl:flex right-auto  py-2  overflow-y-auto  z-40 h-5/6 ">
              <FilterBox filter={filter} toggleButton={toggleBottomSheet} isOpen={isOpen} />
            </Div>
          ) : <FilterShimmer />}
        {products && products.length && !productsLoading ? (
          <Div className=" flex  xl:right-0 xl:w-9/12 w-full  xl:justify-end  ">
            <ProductCardsWrapper className="flex  w-full justify-center  ">
              <Div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xl:grid-cols-4 py-2   place-items-center ">
                {
                  products.map((item) => <Card key={item._id} {...item} />)
                }
              </Div>
            </ProductCardsWrapper>
          </Div>
        ) : <ProductsShimmer />}

      </Div>
      <Div className="w-full flex justify-end">
        <Pagination />
      </Div>
    </Div>
  );
}

export default ProductsPage;
