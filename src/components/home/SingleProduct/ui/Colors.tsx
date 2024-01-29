import React from 'react';
import convert from 'color-convert';

function Colors({ color }:{ color:string }) {
  return (
    <div className="flex bg-white items-center my-5">
      <input type="checkbox" name="color" id={color} className="w-5 h-5 accent-black border-white bg-white rounded-lg" />
      <label
        htmlFor={color}
        className="pl-2 text-slate-400 flex gap-2 select-none"
      >
        <button type="button" aria-label="Save" className="w-5 h-5 rounded-full" style={{ backgroundColor: `#${convert.rgb.hex(convert.keyword.rgb(color.toLocaleLowerCase() as unknown as any))}` }} />
        {color}
      </label>

    </div>
  );
}

export default Colors;
