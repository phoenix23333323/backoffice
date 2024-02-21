import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from '../api/axios';
import useAuth from './useAuth';

import { setCompanyId } from '../store/company/companySlice';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const refresh = async () => {
    try {
      const response = await axios.get('/refreshToken');

      setAuth({
        admin: response.data.admin,
        token: response.data.token,
        userId: response.data.userId,
      });

      const companyId = response.data.companyId;
      dispatch(setCompanyId(companyId));

      return response.data.token;
    } catch (e) {
      navigate('/auth', { state: { from: location } });
    }
  };

  return refresh;
};

export default useRefreshToken;
