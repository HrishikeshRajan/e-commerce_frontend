import React from 'react';
import Categories from './Categories';
import FlashSale from '../flashsale/FlashSaleWrapper';

function Home() {
  return (
    <>
      <FlashSale />
      <Categories />
    </>
  );
}

export default Home;
