import { useContext } from 'react';
import AuthContext from '../features/auth/AuthProvider';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth doit être utilisé avec un AuthProvider');
  }

  return context;
};

export default useAuth;
