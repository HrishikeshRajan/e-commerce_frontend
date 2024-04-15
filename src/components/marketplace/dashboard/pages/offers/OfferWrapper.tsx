import React from 'react';
import { Outlet } from 'react-router-dom';

function OfferWrapper() {
  return (
    <div className="w-full p-1 xl:container flex  justify-center xl:justify-end"><Outlet /></div>
  );
}

export default OfferWrapper;
