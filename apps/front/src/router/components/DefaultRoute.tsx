import { Navigate } from 'react-router-dom';

import { UserRole } from '../../api';
import { useConnectedUser } from '../../hooks/useAuth';
import { Routes } from '../routes/routes';

export default function DefaultRoute() {
  const { data: user } = useConnectedUser();

  if (!user) {
    return <Navigate to={Routes.home} replace />;
  }

  switch (user?.role) {
    case UserRole.Admin:
      return <Navigate to={Routes.admin} replace />;
    case UserRole.ServiceProvider:
      return <Navigate to={Routes.provider} replace />;
    case UserRole.Client:
      return <Navigate to={Routes.dashbaord} replace />;
    default:
      return <Navigate to={Routes.home} replace />;
  }
}
