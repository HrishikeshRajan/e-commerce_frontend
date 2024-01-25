import React from 'react';

function ProductCard() {
  return (
    <div className="relative lg:m-1 flex w-48 lg:w-56   flex-col overflow-hidden  border border-gray-100 bg-white shadow-sm">
      <div className="relative px-1 flex h-52 overflow-hidden ">
        <div className=" w-full h-56 bg-slate-300  animate-pulse" />

      </div>
      <div className="mt-4 px-5 pb-5 ">
        <div className=" w-full   ">
          <div className="flex">

            <span className="mr-2 h-3 bg-slate-300 animate-pulse  rounded  px-5 py-0.5 text-xs " />
          </div>
          <span className=" h-2 px-10  bg-slate-200  rounded  " />
          <div className="  my-1 h-1 animate-pulse bg-slate-400" />

          <div className="h-2 w-full bg-slate-200" />

        </div>
        <div className="mt-2 mb-5 flex items-start justify-between flex-col gap-2">
          <div className="flex items-center">

            <span className="mr-2 h-3 animate-pulse bg-slate-300   rounded  px-20 py-0.5 text-xs " />
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductCard;
