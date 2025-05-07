import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useConnectedUser } from '../../hooks/useAuth';

type GuestProps = {
  children: ReactNode;
};

export default function Guest({ children }: GuestProps) {
  const { data: user } = useConnectedUser();

  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
