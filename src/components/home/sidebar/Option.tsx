import Div from '@/components/CustomElements/Div';
import Span from '@/components/CustomElements/Span';
import React from 'react';

/* eslint-disable react/require-default-props */
type OptionProps = {
  count?: number
  children:React.ReactNode;
  className?:string;
};

export default function Option({
  count, children, className,
}: OptionProps) {
  return (
    <Div className={`${className ?? 'flex items-center'}`}>

      {children}
      {count && (
        <Span className="text-slate-500 ms-3 text-xs">
          {count > 0 ? `(${count})` : ''}
        </Span>
      )}
    </Div>
  );
}
