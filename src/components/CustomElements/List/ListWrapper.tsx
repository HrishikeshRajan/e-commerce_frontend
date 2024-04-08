/* eslint-disable react/require-default-props */
import React, { forwardRef } from 'react';

interface Props {
  children?: React.ReactNode;
  className?:string;
}

type ListWrapperRef = React.Ref<HTMLUListElement> | null ;

const ListWrapper = forwardRef((props: Props, ref : ListWrapperRef) => (
  <ul ref={ref} className={`${props.className ?? 'list-none p-2 shadow-lg rounded-b-xl space-1 flex flex-col text-black w-full bg-white absolute top-full '}`}>
    {props.children}
  </ul>
));
ListWrapper.displayName = 'ListWrapper';

export default ListWrapper;
