import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  useEffect(() => {
    if (auth?.token == null) {
      navigate('/auth', { replace: true });
    }
  }, [navigate, auth]);

  return children;
}
