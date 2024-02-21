import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.token ? (
    children
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
