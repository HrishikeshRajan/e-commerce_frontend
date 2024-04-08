/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Products from './Products';
// import Sidebar from '../home/sidebar/Sidebar';
import Pagination from './Pagination';
import Div from '../CustomElements/Div';

function ProductCardsWrapper() {
  return (

    <Div className="flex flex-col">
      <Div className="w-full flex lg:mt-36">
        {/* <Sidebar /> */}
        <Products />
      </Div>
      <Pagination />
    </Div>
  );
}

export default ProductCardsWrapper;
