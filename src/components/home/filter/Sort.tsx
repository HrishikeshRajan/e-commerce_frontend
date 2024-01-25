/* eslint-disable jsx-a11y/click-events-have-key-events */
import { SlArrowDown } from 'react-icons/sl';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SORT_OPTIONS } from './SORT_OPTIONS';

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSort = (option: { label: string; field: string; value: string; id: number; }) => {
    searchParams.set(option.field, option.value);
    setSearchParams(searchParams);
  };

  const findLabel = (value:string) => {
    const option = SORT_OPTIONS.find((item) => item.value === value);
    return option?.label;
  };

  return (
    <div tabIndex={0} role="button" className="w-full relative flex justify-end    p-2 lg:mr-20 items-center gap-2 text-slate-700">
      <div className="group w-4/12 flex items-center gap-2 p-3  ">
        <span className="text-normal">Sort by:</span>
        <span className="font-medium">{findLabel(searchParams.get('sort')!) || ''}</span>
        <SlArrowDown />
        <div className="absolute top-10 z-10 bg-white w-4/12    ">
          <ul className="hidden flex-col gap-2 p-3  shadow-lg left-0 group-hover:flex">
            {SORT_OPTIONS.map((option) => (
              <li key={option.id} className="hover:bg-slate-200 active:bg-slate-200 p-3 w-full cursor-pointer">
                <button onClick={() => handleSort(option)} className="text-base" type="button">{option.label}</button>
              </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  );
}
export default Filter;
