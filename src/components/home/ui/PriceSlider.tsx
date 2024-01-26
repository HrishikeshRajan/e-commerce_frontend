/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactSlider from 'react-slider';

function PriceSlider() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minmax, setMinMax] = useState([100, 1000]);
  const handleSlider = (item:number[]) => {
    setMinMax(item);
  };
  const rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <div className="h-20">
      <div className="flex justify-between">
        <h1 className="font-bold text-slate-800 py-1 ms-5">      Price</h1>

        <button
          onClick={() => {
            searchParams.set('price[gte]', JSON.stringify(minmax[0]));
            searchParams.set('price[lte]', JSON.stringify(minmax[1]));
            setSearchParams(searchParams, { replace: true });
          }}
          type="button"
          className="py-1 px-2 font-bold text-xs rounded text-cyan-600 hover:scale-105 active:scale-105"
        >
          APPLY

        </button>
      </div>

      <ul className="flex w-full justify-evenly my-5">
        <li className="text-xs font-bold text-slate-800">
          Min:
          {' '}
          {rupee.format(Math.trunc(minmax[0]))}
        </li>
        <li className="text-xs font-bold text-slate-800">
          Max:
          {' '}
          {' '}
          {rupee.format(Math.trunc(minmax[1]))}
        </li>
      </ul>
      <ReactSlider
        value={minmax}
        max={10000}
        min={100}
        className="bg-red-200"
        thumbClassName="bg-cyan-400 rounded-full outline-none cursor-pointer p-2"
        trackClassName="bg-slate-300 rounded h-4"
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        defaultValue={[100, 1000]}
        onChange={handleSlider}
        minDistance={1000}
        withTracks
        step={500}
      />

    </div>
  );
}

export default PriceSlider;
