import React from 'react';

export interface HandleCancelOrders {
  handleCancelOrders:() => void
}
function CancelButton({ handleCancelOrders }:HandleCancelOrders) {
  return <button onClick={handleCancelOrders} type="button" className="border-2 border-slate-500  rounded-xl shadow-sm px-2 py-1 font-semibold text-slate-600 active:scale-105 hover:scale-105 transition delay-10 duration-300 ease-in-out">Cancel Order</button>;
}

export default CancelButton;
