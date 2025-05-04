import { useMemo } from 'react';

import { UserRole } from '../api';

import { useConnectedUser } from './useAuth';

export function useGranted(roles: UserRole[], anonymous?: boolean) {
  const { data: user } = useConnectedUser();

  return useMemo(
    () => (user && !roles.includes(user.role!)) || (!user && anonymous),
    [user, roles, anonymous],
  );
}
