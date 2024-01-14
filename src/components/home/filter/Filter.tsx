/* eslint-disable jsx-a11y/click-events-have-key-events */
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

function Filter() {
  const [sort, setSort] = useState(false);
  return (
    <>
      <div tabIndex={0} role="button" onClick={() => setSort(!sort)} className="w-full  flex justify-end p-2 lg:mr-20 items-center gap-2 text-slate-700">
        Sort
        <FontAwesomeIcon aria-label="button" className="flex cursor-pointer items-center justify-end" icon={faSort} />
      </div>
      {sort && (
        <div className="absolute bg-white mt-10 ">
          <ul className="flex flex-col gap-2 p-2 shadow-lg left-0">
            <li className="hover:bg-slate-200 active:bg-slate-200 cursor-pointer">Price:High to Low</li>
            <li className="hover:bg-slate-200 active:bg-slate-200 cursor-pointer">Price:Low to Hight</li>
            <li className="hover:bg-slate-200 active:bg-slate-200 cursor-pointer">Latest</li>
            <li className="hover:bg-slate-200 active:bg-slate-200 cursor-pointer">Ratings</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Filter;
