import { useLocation, Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth);

  return auth?.token ? (
    children
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
}
