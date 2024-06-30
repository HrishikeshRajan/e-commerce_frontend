import { Slider } from '@/utils/slider/SliderWrapper';
import React from 'react';

function ProductSlider({ children, title }:{ children:React.ReactNode, title:string }) {
  return (
    <div className="w-full h-fit py-5 border-2  ps-1">
      <h1 className="text-xl font-bold border-b-2 text-slate-800 p-3">{title}</h1>
      <div className="overflow-hidden w-full">
        <Slider>
          <div className=" flex p-3">
            {children}
          </div>
        </Slider>
      </div>

    </div>
  );
}

export default ProductSlider;
