/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Products from './Products';
import Sidebar from '../home/sidebar/Sidebar';
import Pagination from './Pagination';

function ProductCardsWrapper() {
  return (

    <div className="flex flex-col">
      <div className="w-full flex lg:mt-36">
        <Sidebar />
        <Products />

      </div>
      <Pagination />
    </div>
  );
}

export default ProductCardsWrapper;
