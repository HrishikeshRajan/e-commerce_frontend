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
    <ul className="ml-3 p-1 text-gray-200  bg-gray-900 rounded m-2    transition delay-150">
      {
        item.map((subitem) => <Item key={subitem.id} item={subitem} />)
      }
    </ul>
  );
}

export default SubMenu;
