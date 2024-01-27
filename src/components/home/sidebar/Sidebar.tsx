/* eslint-disable security/detect-object-injection */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import convert from 'color-convert';
import useFilter from '@/hooks/useFilter';
import { useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import PriceSlider from '../ui/PriceSlider';

function Sidebar() {
  const [isFilter, setIsFilter] = useState<boolean>(true);
  const [brandCount, setBrandCount] = useState(10);
  const [colorCount, setColorCount] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();

  const { filter } = useFilter();
  const brands = useTypedSelector((store) => store.products.brandCount);

  const handleCheckBox = (e :React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (e.target.name === 'brand') {
        const name = e.target.value;

        searchParams.append('brand', name);
        setSearchParams(searchParams, { replace: true });
        return;
      } if (e.target.name === 'color') {
        const name = e.target.value;
        searchParams.append('color', name);
        setSearchParams(searchParams, { replace: true });
        return;
      }
    }

    if (!e.target.checked) {
      if (e.target.name === 'brand') {
        const filteredBrands = searchParams.getAll('brand').filter((val) => val !== e.target.value);
        searchParams.delete('brand');
        filteredBrands.map((item) => searchParams.append('brand', item));
        setSearchParams(searchParams, { replace: true });
      } else if (e.target.name === 'color') {
        const filteredColors = searchParams.getAll('color').filter((val) => val !== e.target.value);
        searchParams.delete('color');
        filteredColors.map((item) => searchParams.append('color', item));
        setSearchParams(searchParams, { replace: true });
      }
    }
  };
  if (!filter) return;

  return (
    <>
      <div className={`static transition p-3   ${isFilter ? '-translate-x-96' : 'translate-x-0'}  lg:translate-x-0 z-10 h-fit bg-white shadow-lg w-9/12 lg:w-3/12 left-0 `}>
        <div className="flex justify-between">
          <h1 className="font-bold text-slate-800 py-1 ms-5">Filter</h1>
          <button
            onClick={() => {
              searchParams.delete('brand');
              searchParams.delete('color');
              searchParams.delete('sort');
              searchParams.delete('page');
              searchParams.delete('price[gte]');
              searchParams.delete('price[lte]');
              searchParams.delete('name');
              setSearchParams(searchParams, { replace: true });
            }}
            type="button"
            className="py-1 px-2 font-bold text-xs rounded text-cyan-600 hover:scale-105 active:scale-105"
          >
            CLEAR ALL

          </button>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 d" />
        <div>
          <h2 className="font-semibold text-slate-700 text-sm mb-2 ms-5">BRAND</h2>

          <div className="ms-5 flex gap-2 flex-col">
            {filter.brands
            && filter.brands.slice(0, brandCount).map((brand:string, index:number) => (
              <div className="flex  items-center" key={index}>
                <input type="checkbox" id={brand} name="brand" checked={searchParams.getAll('brand').includes(brand)} value={brand} onChange={(e) => handleCheckBox(e)} className="w-6 h-6 accent-black border-white bg-white rounded-lg" />

                <label
                  htmlFor={brand}
                  className="pl-2 text-slate-400"
                >
                  {brand}
                </label>
                {brands && brands.length > 0 && <span className="text-slate-500 ms-3 text-xs">{brands && brands[index]._id.brand === brand ? `(${brands[index].count})` : ''}</span> }
              </div>
            ))}
            {filter.brands && filter.brands.length > 10 && filter.brands.length !== brandCount && <button type="button" onClick={() => setBrandCount((num) => num + brandCount)} className="text-slate-600">+ Show more</button>}
            {filter.brands && filter.brands.length === brandCount && <button type="button" onClick={() => setBrandCount((num) => num - 10)} className="text-slate-600"> - Show less</button>}

          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 " />
          <h2 className="font-semibold text-slate-700 text-sm mb-2 ms-5">COLOR</h2>
          <div className="ms-5 flex gap-2 flex-col">
            {filter.colors
             && filter.colors.slice(0, colorCount).map((color:string, index:number) => (
               <div className="flex bg-white items-center" key={index}>
                 <input type="checkbox" name="color" checked={searchParams.getAll('color').includes(color)} onChange={(e) => handleCheckBox(e)} value={color} id={color} className="w-6 h-6 accent-black border-white bg-white rounded-lg" />
                 <label
                   htmlFor={color}
                   className="pl-2 text-slate-400 flex gap-2"
                 >
                   <button type="button" className="w-5 h-5 rounded-full" style={{ backgroundColor: `#${convert.rgb.hex(convert.keyword.rgb(color.toLocaleLowerCase() as unknown as any))}` }} />
                   {color}
                 </label>

               </div>
             ))}
            {filter.colors && filter.colors.length > 10 && filter.colors.length !== colorCount && <button type="button" onClick={() => setColorCount((num) => num + colorCount)} className="text-slate-600">+ Show more</button>}
            {filter.colors && filter.colors.length === colorCount && <button type="button" onClick={() => setColorCount((num) => num - 10)} className="text-slate-600"> - Show less</button>}

          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 " />
          <PriceSlider />
        </div>
      </div>
      <button type="button" className="lg:hidden text-black mt-20 absolute z-10" onClick={() => setIsFilter(!filter)}>Click</button>

    </>
  );
}

export default Sidebar;
