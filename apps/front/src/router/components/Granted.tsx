import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { UserRole } from '../../api';
import { useConnectedUser } from '../../hooks/useAuth';
import { Routes } from '../routes/routes';

type GrantedProps = {
  roles: UserRole[];
  children: ReactNode;
};

export default function Granted({ children, roles }: GrantedProps) {
  const { data: user } = useConnectedUser();

  if (!user) {
    return <Navigate to={Routes.login} />;
  }

  if (!roles.includes(user.role!)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
