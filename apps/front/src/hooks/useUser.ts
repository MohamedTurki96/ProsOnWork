import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { UserUpdateDTO } from '../api';

import { useApi } from './useApi';
import { toastError } from './utils';

export function useUser(id?: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['users', id],
    queryFn: () => api.users.getUser(id!),
    enabled: !!id,
  });
}


export function usePlans() {
  const api = useApi();

  return useQuery({
    queryKey: ['plans'],
    queryFn: () => api.users.plans(),
  });
}

export function useUpdateUser(toaster?: boolean) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserUpdateDTO) => api.users.updateOwnUser(data),
    onError: (error) => {
      console.log('Error updating user', error);
      toastError(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      if (toaster) {
        toast.success('User updated!');
      }
    },
  });
}
