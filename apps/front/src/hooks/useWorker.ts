import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  WorkerCreateDTO,
  WorkerDTO,
  WorkerListWhereDTO,
  WorkerUpdateDTO,
} from '../api';

import { useApi } from './useApi';
import { toastError } from './utils';

export function useWorker(id?: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['workers', id],
    queryFn: () => api.workers.get(id!),
    enabled: !!id,
  });
}

export function useWorkers(where: WorkerListWhereDTO) {
  const api = useApi();

  return useQuery({
    queryKey: ['workers'],
    queryFn: () => api.workers.list({ where }),
  });
}

export function useCreateWorker(onSuccess?: (data: WorkerDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WorkerCreateDTO) => api.workers.create(data),
    onError: (error) => {
      console.log('Error Creating Worker', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Worker created !');
      await queryClient.invalidateQueries({ queryKey: ['workers'] });
      onSuccess?.(data);
    },
  });
}

export function useUpdateWorker(onSuccess?: (data: WorkerDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WorkerUpdateDTO & { id: number }) =>
      api.workers.update(data.id, data),
    onError: (error) => {
      console.log('Error Updating Worker', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Worker updated !');
      await queryClient.invalidateQueries({ queryKey: ['workers'] });
      onSuccess?.(data);
    },
  });
}

export function useDeleteWorker(onSuccess?: () => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.workers.delete(id),
    onError: (error) => {
      console.log('Error Deleting Worker', error);
      toastError(error);
    },
    onSuccess: async () => {
      onSuccess?.();
      toast.success('Worker Deleted !');
      await queryClient.invalidateQueries({ queryKey: ['workers'] });
    },
  });
}
