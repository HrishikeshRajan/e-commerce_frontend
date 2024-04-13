/* eslint-disable react/require-default-props */
import React from 'react';

type SidebarProps = {
  children:React.ReactNode;
  className?: string;
};
function Sidebar(props:SidebarProps) {
  return (
    <aside
      className={props.className}
    >
      {props.children}
    </aside>
  );
}

export default Sidebar;
