import { Navigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';

export const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

export const UserRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  if (user.role !== 'user') return <Navigate to="/admin" />;
  return children;
};

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user.token) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/'} />;
  }
  return children;
};
