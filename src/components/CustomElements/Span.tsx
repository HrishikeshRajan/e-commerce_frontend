/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { ForwardedRef, forwardRef } from 'react';

type SpanProps = {
  children:React.ReactNode;
  className?:string
};

type Ref = ForwardedRef<HTMLSpanElement>;
const Span = forwardRef((props:SpanProps, ref:Ref) => (
  <span ref={ref} className={`${props.className ?? 'text-slate-400 text-xs'}`}>{props.children}</span>
));
Span.displayName = 'Span';
export default Span;
