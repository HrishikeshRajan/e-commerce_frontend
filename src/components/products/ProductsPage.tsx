/* eslint-disable react/jsx-props-no-spreading */
import {
  lazy, Suspense, useEffect, useMemo, useState,
} from 'react';

import useFilter from '@/hooks/useFilter';
import { useSearchParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import useProductsQuery from '@/hooks/user/useProductsQuery';
import { currentPage } from '@/utils/reduxSlice/appSlice';
import Loading from '@/utils/animations/Loading';
import Div from '../CustomElements/Div';
import ProductsShimmer from '../shimmer/ProductsShimmer';
import ProductNotFoundError from './ProductNotFoundError';
import PaginationShimmer from '../shimmer/PaginationShimmer';
import FilterShimmer from '../shimmer/FilterShimmer';

const FilterBox = lazy(() => import('../home/sidebar/FilterBox'));
const Sort = lazy(() => import('../home/filter/Sort'));
const Pagination = lazy(() => import('./Pagination'));
const Products = lazy(() => import('./Products'));

function ProductsPage() {
  const { filter, loading } = useFilter();
  const memoFilter = useMemo(() => filter, [filter]);
  const [isOpen, setIsOpen] = useState(false);
  const [page] = useState(1);
  const products = useTypedSelector((store) => store.products.userProducts);
  const [searchParams] = useSearchParams();
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(currentPage('products'));
    return () => {
      dispatch(currentPage(''));
    };
  }, [dispatch]);

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

    <Div>

      {memoFilter && !loading

        ? (

          <Div className={`xl:hidden z-50 fixed bottom-0 w-full ${isOpen ? 'h-screen ' : 'h-20'}`}>
            <Suspense fallback={<div className="fixed left-0 xl:hidden bg-white right-0 bottom-0  delay-75 duration-150 ease overflow-y-auto  z-40  xl:bottom-10 xl:left-0"><Loading /></div>}>
              <FilterBox filter={memoFilter} toggleButton={toggleBottomSheet} isOpen={isOpen} />
            </Suspense>
          </Div>
        ) : <FilterShimmer />}

      <Div className="flex w-full relative top-full mt-[100px] min-h-screen">
        {memoFilter && !loading
        && (
          <Div className="relative hidden xl:block w-4/12">
            <Suspense fallback={<div className="static  bg-white w-3/12 left-0 hidden xl:flex right-auto  py-2  delay-75 duration-150 ease overflow-y-auto  z-40 max-h-screen"><Loading /></div>}>
              <FilterBox filter={memoFilter} toggleButton={toggleBottomSheet} isOpen={isOpen} />
            </Suspense>
          </Div>
        )}

        <div className="flex flex-col w-full ">
          <Div className="w-auto h-20 bg-gray-100 flex justify-end border-2 border-gray-50">
            <Suspense fallback={<div className="w-full h-20 bg-slate-200"><Loading /></div>}>
              <Sort />
            </Suspense>
          </Div>
          <div className="w-full p-2">
            <Suspense fallback={<ProductsShimmer />}>
              <Products />
            </Suspense>

          </div>
        </div>
      </Div>
      <Div className="w-full flex justify-end">

        <Suspense fallback={<PaginationShimmer />}>
          {products && products.length > 10 && <Pagination />}
        </Suspense>
      </Div>
    </Div>
  );
}

export default ProductsPage;
