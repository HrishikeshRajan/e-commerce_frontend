/* eslint-disable import/no-extraneous-dependencies */
import { ProductCore } from '@/types/Product';
import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import Image from './Image';

function Images({ src }:{ src:ProductCore['images'] }) {
  return (
    <div>
      {src.map((item) => (
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: 'Wristwatch by Ted Baker London',
              isFluidWidth: true,
              src: item.secure_url,
            },
            largeImage: {
              src: item.secure_url,
              width: 1200,
              height: 1800,
            },
          }}
        />
      ))}
    </div>
  );
}

export default Images;
