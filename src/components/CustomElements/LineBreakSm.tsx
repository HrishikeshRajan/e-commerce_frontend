/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { HTMLAttributes } from 'react';

function LineBreakSm({ props }:{ props?:HTMLAttributes<HTMLHRElement>, className?:string }) {
  return (
    <hr className={`${props?.className ?? 'h-px  bg-gray-200 border-0 d'}`} {...props} />
  );
}

export default LineBreakSm;
