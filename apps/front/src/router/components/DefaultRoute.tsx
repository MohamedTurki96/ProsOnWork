import { Navigate } from 'react-router-dom';
import { useConnectedUser } from '../../hooks/useAuth';
import { Routes } from '../routes/routes';
import { UserRoleEnum } from '../../api';

export default function DefaultRoute() {
  const { data: user } = useConnectedUser();

  if (!user) {
    return <Navigate to={Routes.home} replace />;
  }

  switch (user?.role) {
    case UserRoleEnum.ADMIN:
      return <Navigate to={Routes.admin} replace />;
    case UserRoleEnum.SERVICE_PROVIDER:
      return <Navigate to={Routes.provider} replace />;
    case UserRoleEnum.CLIENT:
      return <Navigate to={Routes.dashbaord} replace />;
    default:
      return <Navigate to={Routes.home} replace />;
  }
}
