/* eslint-disable jsx-a11y/click-events-have-key-events */
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Span from '@/components/CustomElements/Span';
import Div from '@/components/CustomElements/Div';
import ListWrapper from '@/components/CustomElements/List/ListWrapper';
import ListItem from '@/components/CustomElements/List/ListItem';
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

  const [open, setOpen] = useState(false);

  return (
    <Div tabIndex={0} role="button" className="w-full relative flex  items-center">
      <Div className="group w-full justify-end flex lg:flex-row items-center gap-2 p-3  ">
        <button type="button" className="flex items-center mr-5  gap-2 outline-none" onClick={() => setOpen(!open)}>
          <Span className="text-normal">Sort by:</Span>
          <Span className="font-xs hidden lg:block">{findLabel(searchParams.get('sort')!) || ''}</Span>
          {open ? <SlArrowUp /> : <SlArrowDown /> }
        </button>
        {open && (
          <Div className="absolute top-10 z-10 bg-white w-auto    ">
            <ListWrapper className="flex-col gap-2 p-3 rounded-xl  shadow-lg left-0">
              { SORT_OPTIONS.map((option) => (
                <ListItem key={option.id} className={`${searchParams.has('sort', option.value) ? 'text-red-500' : 'text-black'}hover:bg-slate-200   hover:rounded-xl p-3 w-full cursor-pointer`}>
                  <button onClick={() => handleSort(option)} className={`${searchParams.has('sort', option.value) ? ' text-slate-500 bg-slate-50' : 'text-black'}"text-xs"`} type="button">{option.label}</button>
                </ListItem>
              ))}

            </ListWrapper>
          </Div>
        )}
      </Div>
    </Div>
  );
}
export default Filter;
