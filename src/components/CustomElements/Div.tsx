/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { forwardRef, HTMLAttributes } from 'react';

type DivProps = {
  children?:React.ReactNode;
  className?:string;
};
type Props = DivProps & HTMLAttributes<HTMLDivElement>;

const Div = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, ...rest } = props;

  return <div ref={ref} {...rest} className={`${className ?? 'text-slate-400 text-xs'}`}>{children}</div>;
});
Div.displayName = 'Div';
export default Div;
