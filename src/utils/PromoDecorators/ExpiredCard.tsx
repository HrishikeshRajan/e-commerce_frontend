import React from 'react';

function ExpiredCard({ children }:{ children:React.ReactNode }) {
  return (
    <div className="w-fit">
      <span className="bg-red-500 p-1 absolute z-10 w-32 text-center text-white font-bold">Coupon Expired</span>
      {children}
    </div>
  );
}

export default ExpiredCard;
