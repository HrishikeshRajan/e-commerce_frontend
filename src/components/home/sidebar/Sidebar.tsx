/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import convert from 'color-convert';
import { ProductQuery } from '@/utils/reduxSlice/productSlice';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import useFilter from '@/hooks/useFilter';
import { useSearchParams } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage';

function Sidebar() {
  const [isFilter, setIsFilter] = useState<boolean>(true);
  const [brandCount, setBrandCount] = useState(10);
  const [colorCount, setColorCount] = useState(10);
  const dispatch = useTypedDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedVal, setData] = useLocalStorage<string, ProductQuery>('filter');
  const [queryObject, setqueryObject] = useState<ProductQuery>(() => {
    if (storedVal) {
      return {
        brand: storedVal.brand && storedVal.brand?.length > 0 ? storedVal?.brand : [],
        color: storedVal.color && storedVal?.color.length > 0 ? storedVal?.color : [],
        category: searchParams.get('category')!,
      };
    }
    return {
      brand: [],
      color: [],
      category: searchParams.get('category')!,
    };
  });

  const { filter } = useFilter();

  useEffect(() => {
    setSearchParams(queryObject as Record<string, string>);
    setData(queryObject);
  }, [queryObject, dispatch, setSearchParams]);

  const handleCheckBox = (e :React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (e.target.name === 'brand') {
        setqueryObject((prev) => ({
          ...prev,
          brand: [...queryObject.brand!, e.target.value],
        }));
      } else if (e.target.name === 'color') {
        setqueryObject((prev) => ({
          ...prev,

          color: [...queryObject.color!, e.target.value],
        }));
      }
    }

    if (!e.target.checked) {
      if (e.target.name === 'brand') {
        const rest = queryObject.brand?.filter((item) => item !== e.target.value);
        setqueryObject((prev) => ({ ...prev, brand: rest }));
      } else if (e.target.name === 'color') {
        const rest = queryObject.color?.filter((item) => item !== e.target.value);
        setqueryObject((prev) => ({ ...prev, color: [...rest!] }));
      }
    }
  };
  if (!filter) return;

  return (
    <>
      <div className={`absolute transition p-3   ${isFilter ? '-translate-x-96' : 'translate-x-0'} overflow-y-auto lg:translate-x-0 z-10 h-fit bg-white shadow-lg w-9/12 lg:w-60 left-0 `}>
        <h1 className="font-bold text-slate-800 py-5 ms-5">Filter</h1>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div>
          <h2 className="font-semibold text-slate-700 text-sm mb-2 ms-5">BRAND</h2>

          <div className="ms-5 flex gap-2 flex-col">
            {filter.brands
            && filter.brands.slice(0, brandCount).map((brand:string, index:number) => (
              <div className="flex  items-center" key={index}>
                <input type="checkbox" id={brand} name="brand" checked={storedVal ? storedVal.brand?.includes(brand) : undefined} value={brand} onChange={(e) => handleCheckBox(e)} className="w-6 h-6 accent-black border-white bg-white rounded-lg" />

                <label
                  htmlFor={brand}
                  className="pl-2 text-slate-400"
                >
                  {brand}
                </label>
              </div>
            ))}
            {filter.brands && filter.brands.length > 10 && filter.brands.length !== brandCount && <button type="button" onClick={() => setBrandCount((num) => num + brandCount)} className="text-slate-600">+ Show more</button>}
            {filter.brands && filter.brands.length === brandCount && <button type="button" onClick={() => setBrandCount((num) => num - 10)} className="text-slate-600"> - Show less</button>}

          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <h2 className="font-semibold text-slate-700 text-sm mb-2 ms-5">COLOR</h2>
          <div className="ms-5 flex gap-2 flex-col">
            {filter.colors
             && filter.colors.slice(0, colorCount).map((color:string, index:number) => (
               <div className="flex  items-center" key={index}>
                 <input type="checkbox" name="color" checked={storedVal ? storedVal.color?.includes(color) : undefined} onChange={(e) => handleCheckBox(e)} value={color} id={color} className="w-6 h-6 accent-black border-white bg-white rounded-lg" />
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
        </div>
      </div>
      <button type="button" className="lg:hidden text-black mt-20 absolute z-10" onClick={() => setIsFilter(!filter)}>Click</button>

    </>
  );
}

export default Sidebar;
