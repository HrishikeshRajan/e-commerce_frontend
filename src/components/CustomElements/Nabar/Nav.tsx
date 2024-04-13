/* eslint-disable react/require-default-props */
import React from 'react';

type NavProps = {
  children:React.ReactNode;
  className?: string;
};
function Nav(props:NavProps) {
  return (
    <nav
      className={props.className}
    >
      {props.children}
    </nav>
  );
}

export default Nav;
