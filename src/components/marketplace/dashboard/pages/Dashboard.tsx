import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../ui/sidebar/Sidebar';

function Dashboard() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full h-screen overflow-y-scroll">
        <Outlet />
      </div>

    </div>
  );
}

export default Dashboard;
