import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { CategoryCreateDTO, CategoryDTO, CategoryUpdateDTO } from '../api';

import { useApi } from './useApi';
import { toastError } from './utils';

export function useCategory(id?: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => api.categories.get(id!),
    enabled: !!id
  });
}

export function useCategories() {
  const api = useApi();

  return useQuery({
    queryKey: ['categories'],
    queryFn: () => api.categories.list(),
  });
}

export function useCreateCategory(onSuccess?: (data: CategoryDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryCreateDTO) => api.categories.create(data),
    onError: (error) => {
      console.log('Error Creating category', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Category created !');
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
      onSuccess?.(data);
    },
  });
}

export function useUpdateCategory(onSuccess?: (data: CategoryDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryUpdateDTO & { id: number }) =>
      api.categories.update(data.id, data),
    onError: (error) => {
      console.log('Error Updating category', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Category updated !');
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
      onSuccess?.(data);
    },
  });
}

export function useDeleteCategory(onSuccess?: () => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.categories.delete(id),
    onError: (error) => {
      console.log('Error Deleting category', error);
      toastError(error);
    },
    onSuccess: async () => {
      onSuccess?.()
      toast.success('Category Deleted !');
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
