import { ReactNode } from 'react';
import { useConnectedUser } from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { Routes } from '../routes/routes';
import { UserRoleEnum } from '../../api';

type GrantedProps = {
  roles: UserRoleEnum[];
  children: ReactNode;
};

export default function Granted({ children, roles }: GrantedProps) {
  const { data: user } = useConnectedUser();
  const location = useLocation();

  if (!user) {
    const to = location.pathname.includes('/admin')
      ? Routes.adminLogin
      : Routes.login;

    return <Navigate to={to} />;
  }

  if (!roles.includes(user.role!)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
