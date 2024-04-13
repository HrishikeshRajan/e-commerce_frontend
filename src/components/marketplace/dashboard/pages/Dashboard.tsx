import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarWrapper from '../ui/sidenav/SidebarWrapper';

function Dashboard() {
  return (
    <div className="flex w-full">
      <SidebarWrapper />
      <div className="w-full h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
