/* eslint-disable react/require-default-props */
import React from 'react';

type ProductSliderCardProps = { children:React.ReactNode, title:string, className?:string };
function ProductSliderCard({ children, title, className }:ProductSliderCardProps) {
  return (
    <div className={`w-full h-fit py-5 border-2 rounded-xl  ps-1 ${className}`}>
      <h1 className="text-xl font-bold border-b-2 text-slate-800 p-3">{title}</h1>
      <div className="overflow-hidden">
        {children}
      </div>

    </div>
  );
}

export default ProductSliderCard;
