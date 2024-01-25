/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Products from './Products';
import Sidebar from '../home/sidebar/Sidebar';

function ProductCardsWrapper() {
  return (

    <div className="flex lg:mt-36">
      <Sidebar />
      <Products />

    </div>
  );
}

export default ProductCardsWrapper;
