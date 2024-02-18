import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Auth from '../features/auth/Auth';
import ProtectedRoute from '../features/auth/ProtectedRoute';

import Header from './Header';
import Footer from './Footer';

import Home from '../features/home/Home';

import Counter from '../features/applications/Counter.tsx';

import Company from '../features/Company';
import Clients from '../features/Clients';
import Client from '../features/Client';
import Suppliers from '../features/Suppliers';
import Users from '../features/Users';

import PageError from '../features/PageError';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <PageError />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'company',
        element: <Company />,
      },
      {
        path: 'clients',
        children: [
          {
            path: '',
            element: <Clients />,
          },
          {
            path: ':id',
            element: <Client />,
          },
        ],
      },
      {
        path: 'suppliers',
        element: <Suppliers />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'counter',
        element: <Counter />,
      },
    ],
  },
]);

function Root() {
  return (
    <>
      <Header />
      <div className="main-root">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function RoutesComponent() {
  return <RouterProvider router={router} />;
}

export default RoutesComponent;
