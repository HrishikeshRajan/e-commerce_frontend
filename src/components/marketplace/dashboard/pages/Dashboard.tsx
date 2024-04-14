import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarWrapper from '../ui/sidenav/SidebarWrapper';

function Dashboard() {
  return (
    <>
      <SidebarWrapper />
      <div className=" flex mx-auto w-full  h-auto justify-center xl:justify-end xl:pr-20 overflow-y-auto ">
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
