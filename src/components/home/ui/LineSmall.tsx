/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

function LineSmall() {
  return (
    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
  );
}

export default LineSmall;
interface LineSmallProps extends React.HTMLAttributes<HTMLHRElement> {
  className?: string;
}
const defaultStyle = 'h-px my-4 bg-gray-200 border-0 dark:bg-gray-700';
export function Line({ className = defaultStyle, ...rest }: LineSmallProps) {
  return (
    <hr
      className={className}
      {...rest}
    />
  );
}
Line.defaultProps = {
  className: defaultStyle,
};
