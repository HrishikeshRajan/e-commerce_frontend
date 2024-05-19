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

    <Div className="w-full relative ">
      <Div className="w-full container  top-full mt-28  flex justify-end">
        <Suspense fallback={<div className="w-full h-20 bg-slate-200"><Loading /></div>}>
          <Sort />
        </Suspense>
      </Div>

      {memoFilter && !loading

        ? (

          <Div className={`fixed left-0 xl:hidden bg-white right-0 bottom-0  delay-75 duration-150 ease overflow-y-auto  z-40  xl:bottom-10 xl:left-0 ${isOpen ? 'h-full ' : 'h-20'}`}>
            <Suspense fallback={<div className="fixed left-0 xl:hidden bg-white right-0 bottom-0  delay-75 duration-150 ease overflow-y-auto  z-40  xl:bottom-10 xl:left-0"><Loading /></div>}>
              <FilterBox filter={memoFilter} toggleButton={toggleBottomSheet} isOpen={isOpen} />
            </Suspense>
          </Div>
        ) : <FilterShimmer />}
      <Div className="flex justify-end">
        {memoFilter && !loading
        && (
          <Div className="fixed bg-white w-3/12 left-0 hidden xl:flex right-auto  py-2  delay-75 duration-150 ease overflow-y-auto  z-40 h-5/6 ">
            <Suspense fallback={<div className="fixed bg-white w-3/12 left-0 hidden xl:flex right-auto  py-2  delay-75 duration-150 ease overflow-y-auto  z-40 h-5/6"><Loading /></div>}>
              <FilterBox filter={memoFilter} toggleButton={toggleBottomSheet} isOpen={isOpen} />
            </Suspense>
          </Div>
        )}
        <Suspense fallback={<ProductsShimmer />}>
          <Products />
        </Suspense>

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
