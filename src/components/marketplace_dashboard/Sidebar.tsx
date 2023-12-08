import React from 'react';
import { menu } from './constants';
import Main from './Main';

function Sidebar() {
  return (
    <div className="flex">
      <div className="container  w-72 py-20  h-screen  bg-slate-400 ">
        <ul className="pt-6">
          { menu.map((item) => (
            <li
              key={item.id}
              className="text-gray-300 text-sm flex items-center gap-x-4 p-2 mt-2 hover:bg-slate-500 rounded cursor-pointer"
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <Main />
    </div>
  );
}

export default Sidebar;
