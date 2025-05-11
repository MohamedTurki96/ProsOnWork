import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ReclamationDTO } from '../api';

import { useApi } from './useApi';
import { toastError } from './utils';

export function useReclamations() {
  const api = useApi();

  return useQuery({
    queryKey: ['reclamations'],
    queryFn: () => api.reclamations.list(),
  });
}

export function useReclamationProgress(onSuccess?: (data: ReclamationDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.reclamations.progress(id),
    onError: (error) => {
      console.log('Error Updating Reclamation', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Reclamation status updated !');
      await queryClient.invalidateQueries({ queryKey: ['reclamations'] });
      onSuccess?.(data);
    },
  });
}

export function useReclamationSolve(onSuccess?: (data: ReclamationDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.reclamations.solve(id),
    onError: (error) => {
      console.log('Error Updating Reclamation', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Reclamation status updated !');
      await queryClient.invalidateQueries({ queryKey: ['reclamations'] });
      onSuccess?.(data);
    },
  });
}
