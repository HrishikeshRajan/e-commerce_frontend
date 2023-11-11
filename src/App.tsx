import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/auth/Auth';

const App: React.FC = () => {
  const allRoutes = createBrowserRouter([
    {
      path: '/auth',
      element: <Auth />,
    },
  ]);
  return (
    <>
      <RouterProvider router={allRoutes} />
    </>
  );
};

export default App;
