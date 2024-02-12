import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PageError from '../pages/PageError';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home.tsx';
import Company from '../pages/Company';
import Clients from '../pages/Clients';
import Client from '../pages/Client';
import Suppliers from '../pages/Suppliers';
import Users from '../pages/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <PageError />,
    children: [
      {
        path: 'home',
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
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

function Root() {
  return (
    <>
      <Header />
      <div className="main">
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
