/* eslint-disable import/no-extraneous-dependencies */
import { ProductCore } from '@/types/Product';
import React from 'react';
import Image from './Image';

function Images({ src }:{ src:ProductCore['images'] }) {
  return (
    <div>
      {src.map((item) => <Image secure_url={item.secure_url} key={item._id} />)}
    </div>
  );
}

export default Images;
