import React from 'react';

function ProductImage({ url }:{ url:string }) {
  return (
    <img src={url} alt="product" className="object-cover p-2" />
  );
}

export default ProductImage;
