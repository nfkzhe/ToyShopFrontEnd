
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/contexts/AuthContex';

const PrivateRoute = ({ requiredRole, children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login");
      } else if (user?.role !== requiredRole) {
        navigate("/");
      }
    }
  }, [user, loading, isAuthenticated, requiredRole, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Hoặc component loading khác
  }

  return children;
};


export default PrivateRoute;
