import axios, { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const useInterceptorsAxiosPrivate = () => {
  const { auth } = useAuth();
  const { setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['authorization']) {
          config.headers['authorization'] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (
          error.config.url !== '/refreshToken' &&
          error.response.status === 401 &&
          originalRequest._retry !== true
        ) {
          originalRequest._retry = true;

          const response = await axios.get('/refreshToken', {
            withCredentials: true,
          });

          setAuth({
            admin: response.data.admin,
            token: response.data.token,
            userId: response.data.userId,
          });

          originalRequest.headers['authorization'] =
            `Bearer ${response.data.token}`;

          return axiosPrivate(originalRequest);
        }
        Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);
  return axiosPrivate;
};
export default useInterceptorsAxiosPrivate;
