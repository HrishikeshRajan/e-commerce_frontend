import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../ui/sidebar/Sidebar';

function Dashboard() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
