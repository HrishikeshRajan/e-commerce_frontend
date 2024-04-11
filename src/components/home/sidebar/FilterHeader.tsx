/* eslint-disable react/jsx-props-no-spreading */
import Div from '@/components/CustomElements/Div';
import React from 'react';

interface FilterHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function FilterHeader({ children, ...props }:FilterHeaderProps) {
  return (
    <Div {...props}>
      {children}
    </Div>
  );
}

export default FilterHeader;
