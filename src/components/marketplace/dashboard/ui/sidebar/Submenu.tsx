/* eslint-disable import/no-cycle */
import React from 'react';
import { SidebarItemTypes } from './constants';
import Item from './Item';

type ItemPropTypes = {
  item:SidebarItemTypes[] | undefined
};

function SubMenu({ item }:ItemPropTypes) {
  if (!item) return null;
  return (
    <ul className="ml-3 text-gray-200   rounded m-2 bg-slate-100 p-2">
      {
        item.map((subitem) => <Item key={subitem.id} item={subitem} />)
      }
    </ul>
  );
}

export default SubMenu;
