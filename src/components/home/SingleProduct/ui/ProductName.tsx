import React from 'react';

function ProductName({ name }:{ name:string }) {
  return (
    <h1 className="font-bold my-2 mt-20 text-slate-800">{name}</h1>
  );
}

export default ProductName;
