import React from 'react';
import './App.css';
import Signup from './components/auth/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App: React.FC = () => {
  const allRoutes = createBrowserRouter([
    {
      path: '/auth',
      element: <Signup />,
    },
  ]);
  return (
    <>
      <RouterProvider router={allRoutes} />
    </>
  );
};

export default App;
