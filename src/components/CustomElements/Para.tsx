/* eslint-disable react/require-default-props */
import React from 'react';

function Para({ children, className }:{ children:React.ReactNode, className?:string }) {
  return (
    <p className={`${className ?? 'text-sm tracking-tight text-slate-900'}`}>{children}</p>
  );
}
export default Para;
