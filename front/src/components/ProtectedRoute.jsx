import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(auth);

  useEffect(() => {
    if (auth?.token == null) {
      navigate('/auth', { state: { from: location }, replace: true });
    }
  }, [navigate, location, auth]);

  return children;
}
