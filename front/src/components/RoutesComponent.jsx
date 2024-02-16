import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Auth from '../features/auth/Auth';
import PageError from '../features/PageError';
import Header from './Header';
import Footer from './Footer';
import Home from '../features/Home';
import Company from '../features/Company';
import Clients from '../features/Clients';
import Client from '../features/Client';
import Suppliers from '../features/Suppliers';
import Users from '../features/Users';
import ProtectedRoute from '../features/auth/ProtectedRoute.jsx';

const router = createBrowserRouter([
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
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
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
