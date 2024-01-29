import React from 'react';

function Image({ secure_url }:{ secure_url:string }) {
  return (
    <img src={secure_url} alt="product" />
  );
}

export default Image;
