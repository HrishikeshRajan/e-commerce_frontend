import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center px-2">
      <p className="py-3 text-center text-xs font-base text-slate-600">There is nothing in your bag. Let&apos;s add some items.</p>
      <button type="button" onClick={() => navigate('/')} className=" mt-5 text-slate-900 font-semibold rounded w-full md:w-2/12 p-2 bg-yellow-500 active:scale-95 ease-in-out duration-300">SHOP NOW</button>
    </div>
  );
}

export default EmptyCart;
