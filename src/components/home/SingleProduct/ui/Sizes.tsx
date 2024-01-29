/* eslint-disable react/no-array-index-key */
import React from 'react';

function Sizes({ sizes }:{ sizes:string[] }) {
  return (
    <>
      <h4 className="mt-4 font-bold text-slate-800">SELECT SIZE</h4>
      <ul className="flex justify-start gap-4 mb-3 py-2">
        {sizes.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <input type="checkbox" className="w-5 h-5 w accent-black border-white bg-white rounded-lg" />
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Sizes;
