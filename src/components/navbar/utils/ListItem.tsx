/* eslint-disable react/require-default-props */
import React from 'react';

function ListItem({ children, className }:{ children:React.ReactNode, className?:string }) {
  return (
    <li className={className ?? 'text-xs text-slate-500 p-1'}>{children}</li>
  );
}

export default ListItem;
