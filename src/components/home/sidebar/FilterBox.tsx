/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
/* eslint-disable no-param-reassign */
import Div from '@/components/CustomElements/Div';
import { useState } from 'react';
import LineBreakSm from '@/components/CustomElements/LineBreakSm';
import ListWrapper from '@/components/CustomElements/List/ListWrapper';
import ListItem from '@/components/CustomElements/List/ListItem';
import H2 from '@/components/CustomElements/Headings/H2';
import { useSearchParams } from 'react-router-dom';
import Span from '@/components/CustomElements/Span';
import { FilterBoxItem, FilterValues } from './options';
import FilterHeader from './FilterHeader';
import Option from './Option';

function FilterBox({ filter, toggleButton, isOpen }:{ filter:Array<FilterBoxItem>, toggleButton:() => void, isOpen:boolean }) {
  const [filterOptions, setFilterOptions] = useState<Array<FilterBoxItem> | []>(() => {
    if (filter && filter.length) {
      return filter;
    }
    return [];
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const clearAll = () => {
    searchParams.delete('brand');
    searchParams.delete('color');
    searchParams.delete('sort');
    searchParams.delete('page');
    searchParams.delete('price[gte]');
    searchParams.delete('price[lte]');
    searchParams.delete('name');
    setSearchParams(searchParams, { replace: true });
    if (filterOptions && filterOptions.length) {
      filterOptions.map((title) => title.values.map((item) => {
        item.checked = false;
        return item;
      }));
      setFilterOptions([...filterOptions]);
    }
  };
  const selectOption = (item:FilterBoxItem, value: FilterValues) => {
    filterOptions.map((title) => {
      if (item.title === title.title) {
        return title.values.map((option) => {
          if (option.id === value.id) {
            option.checked = !option.checked;
            if (option.checked) {
              searchParams.append(item.key, option.name);
              setSearchParams(searchParams);
            } else {
              searchParams.delete(item.key, option.name);
              setSearchParams(searchParams);
            }
          }
          return option;
        });
      }
      return [];
    });
    setFilterOptions([...filterOptions]);
  };

  return (
    <Div className="relative w-full">
      <FilterHeader className=" bg-white flex w-full border-2 xl:border-0 justify-between rounded-t-3xl shadow-md">
        <button type="button" className="font-bold text-slate-800 py-5 ms-5 xl:hidden" onClick={toggleButton}>{isOpen ? 'Close' : 'Filter'}</button>
        <h3 className="font-bold text-slate-800 py-5 ms-5 hidden xl:flex">Filter</h3>
        <button
          onClick={clearAll}
          type="button"
          className="py-1 px-2 font-bold text-xs rounded text-cyan-600 hover:scale-105 active:scale-105"
        >
          CLEAR ALL
        </button>
      </FilterHeader>
      <Div className="divide-y divide-solid divide-emerald-400" />
      <Div className="ps-5 py-5 top-full  h-5/6 overflow-y-auto  flex gap-2 flex-col">
        {filterOptions && filterOptions.length && filterOptions.map((item) => (
          <Div key={item.id} className="p-2 ">
            <H2>{item.title}</H2>
            {item && item.values && (
              <ListWrapper className="pl-10 flex flex-col">
                {item.values.map((option) => (
                  <ListItem key={option.id}>
                    <Option className="flex gap-2">
                      <input
                        type="checkbox"
                        name={option.name}
                        checked={option.checked}
                        value={option.name}
                        onChange={() => selectOption(item, option)}
                        className="w-5 h-5 accent-black border-white rounded-lg"
                      />
                      {item.key === 'color' && <Span style={{ backgroundColor: option.name }} className="w-5 h-5 rounded-full" />}
                      {option.name}
                    </Option>
                  </ListItem>
                ))}
              </ListWrapper>
            )}
            <LineBreakSm />
          </Div>
        ))}
      </Div>
    </Div>

  );
}

export default FilterBox;
