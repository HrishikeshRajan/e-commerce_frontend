/* eslint-disable no-sparse-arrays */
/* eslint-disable react/no-array-index-key */
import React from 'react';

function ShimmerCoupon() {
  return (
    <div className="flex justify-center w-full flex-col items-center p-5">
      <div className=" w-6/12 h-10 my-10 bg-slate-300 rounded-xl" />
      <div className="flex w-full justify-center gap-2 flex-wrap">
        { [1, 2, 3,,4, 5].map((_, index) => (
          <div className="relative w-20 xl:w-44 h-28 gap-2 bg-slate-600  p-2 rounded-xl flex flex-col " key={index}>
            <div className="animate-pulse w-full h-5  bg-slate-300 rounded-xl" />
            <div className="animate-pulse w-full h-5  bg-slate-300 rounded-xl" />
            <span className="bg-slate-300 w-full mx-auto border-2 h-10 text-center" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShimmerCoupon;
