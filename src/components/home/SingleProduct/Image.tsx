import React from 'react';

function Image({ secure_url }:{ secure_url:string }) {
  return (
    <img src={secure_url} alt="product" className="xl:w-5/12" />
  );
}

export default Image;
