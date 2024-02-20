import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

import Header from './Header';
import Footer from './Footer';

import LoadingBloc from './LoadingBloc';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  console.log(auth.token);

  return (
    <>
      {!auth.token ? (
        navigate('/auth')
      ) : isLoading ? (
        <LoadingBloc />
      ) : (
        <>
          <Header />
          <div className="main-root">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default PersistLogin;
