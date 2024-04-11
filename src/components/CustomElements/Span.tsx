/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { ForwardedRef, forwardRef, HTMLAttributes } from 'react';

type SpanProps = {
  children?:React.ReactNode;
  className?:string
} & HTMLAttributes<HTMLSpanElement>;

type Ref = ForwardedRef<HTMLSpanElement>;
const Span = forwardRef((props:SpanProps, ref:Ref) => (
  <span ref={ref} {...props} className={`${props.className ?? 'text-slate-400 text-xs'}`}>{props.children}</span>
));
Span.displayName = 'Span';
export default Span;
