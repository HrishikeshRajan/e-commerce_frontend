import PaginationShimmer from '@/components/shimmer/PaginationShimmer';
import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

function Pagination({ totalPages }:{ totalPages:number }) {
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

  if (totalPages < 1) return <PaginationShimmer />;

  return (
    <div className="w-full flex bg-white rounded-md justify-center items-center">
      <div className="text-slate-500 flex items-center">
        Total Pages:
        {totalPages}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next "
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        forcePage={parseInt(searchParams.get('page')!, 10) - 1 || 0}
        pageClassName="p-3 border-2"
        className="flex p-3 rounded-sm"
        previousClassName="p-3 border-2 rounded-sm"
        nextClassName="p-3 border-2 rounded-sm"
        breakClassName="font-bold p-3"
        activeClassName="bg-slate-700"
        activeLinkClassName="text-white font-bold"
      />
    </div>
  );
}

export default Pagination;
