/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLAttributes } from 'react';

type H2Props = {
  children:React.ReactNode;
  className?:string;
} & HTMLAttributes<HTMLHeadingElement>;

function H2({ children, className, ...rest }:H2Props) {
  return (
    <h2 className={`${className ?? 'font-semibold text-slate-700 text-sm mb-2  ms-5'}`} {...rest}>{children}</h2>
  );
}

export default H2;
