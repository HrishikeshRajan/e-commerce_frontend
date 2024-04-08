import Sidebar from '@/components/home/sidebar/Sidebar';
import React from 'react';
import Pagination from '../Pagination';

function ProductCardsWrapper({ children }:{ children:React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="w-full flex lg:mt-36">
        <Sidebar />
        {children}
      </div>
      <Pagination />
    </div>
  );
}

export default ProductCardsWrapper;
