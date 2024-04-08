/* eslint-disable react/require-default-props */
import React from 'react';

type HeadingProps = {
  children:React.ReactNode;
  className?:string;
};
function Heading({ children, className }:HeadingProps) {
  return (
    <h2 className={`${className ?? 'text-4xl text-orange-500 font-bold mt-5 text-center'}`}>{children}</h2>
  );
}

export default Heading;
