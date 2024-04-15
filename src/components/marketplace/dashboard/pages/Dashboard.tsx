import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarWrapper from '../ui/sidenav/SidebarWrapper';

function Dashboard() {
  return (
    <>
      <SidebarWrapper />
      <div className=" flex w-full  h-auto justify-center ">
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
