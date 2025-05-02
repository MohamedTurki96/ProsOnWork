import { useMemo } from 'react';
import { UserRoleEnum } from '../api';
import { useConnectedUser } from './useAuth';

export function useGranted(roles: UserRoleEnum[], anonymous?: boolean) {
  const { data: user } = useConnectedUser();

  return useMemo(
    () => (user && !roles.includes(user.role!)) || (!user && anonymous),
    [user, roles, anonymous],
  );
}
