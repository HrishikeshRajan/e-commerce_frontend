import { useTypedSelector } from '@/hooks/user/reduxHooks';
import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import PaginationShimmer from '../shimmer/PaginationShimmer';

function Pagination() {
  const productsDetails = useTypedSelector((store) => store.products.userProductsMeta);
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageClick = (e:{ selected:number }) => {
    if (e.selected + 1 === 1) {
      searchParams.delete('page');
      setSearchParams(searchParams, { replace: true });
      return;
    }
    searchParams.set('page', JSON.stringify(e.selected + 1));
    setSearchParams(searchParams, { replace: true });
  };

  if (productsDetails.totalPages < 1) return <PaginationShimmer />;

  return (
    <div className="w-full flex  justify-center items-center">
      <div className="text-slate-500 flex items-center">
        Total Pages:
        {productsDetails.totalPages}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next "
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={productsDetails.totalPages}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        forcePage={parseInt(searchParams.get('page')!, 10) - 1 || 0}
        pageClassName="p-3 border-2"
        className="flex p-3"
        previousClassName="p-3 border-2"
        nextClassName="p-3 border-2"
        breakClassName="font-bold p-3"
        activeClassName="bg-slate-700"
        activeLinkClassName="text-white font-bold"
      />
    </div>
  );
}

export default Pagination;
