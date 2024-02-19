import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refreshToken', {
      withCredentials: true,
    });
    const admin = response.data.admin;
    const token = response.data.token;
    const userId = response.data.userId;
    setAuth({ admin, token, userId });

    return token;
  };

  return refresh;
};

export default useRefreshToken;
