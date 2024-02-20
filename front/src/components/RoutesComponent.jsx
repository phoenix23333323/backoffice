import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Auth from '../features/auth/Auth';
import ProtectedRoute from './ProtectedRoute';
import PersistLogin from './PersistLogin';

import Header from './Header';
import Footer from './Footer';

import Home from '../features/home/Home';

import Counter from '../features/applications/Counter';

import Company from '../features/company/Company';
import Clients from '../features/Clients';
import Client from '../features/Client';
import Suppliers from '../features/Suppliers';
import Users from '../features/users/Users';

import PageError from '../features/error/PageError';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: (
      <PersistLogin>
        <ProtectedRoute>
          <Root />
        </ProtectedRoute>
      </PersistLogin>
    ),
    errorElement: (
      <>
        <div className="main-root">
          <PageError />
        </div>
        <Footer />
      </>
    ),
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

export function Root() {
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
