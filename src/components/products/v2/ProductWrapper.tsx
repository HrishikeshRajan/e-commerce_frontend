/* eslint-disable react/require-default-props */
import React from 'react';

type ProductCardWrapperProps = { children:React.ReactNode, className?:string };
function ProductCardsWrapper({ children, className }:ProductCardWrapperProps) {
  return (
    <div className={`${className ?? 'flex flex-col'}`}>
      {children}
    </div>
  );
}

export default ProductCardsWrapper;
