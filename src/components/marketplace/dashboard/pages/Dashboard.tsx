import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarWrapper from '../ui/sidenav/SidebarWrapper';

function Dashboard() {
  return (
    <>
      <SidebarWrapper />
      <div className="flex w-full h-auto xl:6/12 overflow-y-auto absolute  top-0 left-0 right-0 justify-end">
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
