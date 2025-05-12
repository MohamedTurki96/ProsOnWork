import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  ShopCreateDTO,
  ShopDTO,
  ShopListWhereDTO,
  ShopUpdateDTO,
} from '../api';

import { useApi } from './useApi';
import { toastError } from './utils';

export function useShop(id?: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['shops', id],
    queryFn: () => api.shops.get(id!),
    enabled: !!id,
  });
}

export function useShops(where: ShopListWhereDTO) {
  const api = useApi();

  return useQuery({
    queryKey: ['shops', where],
    queryFn: () => api.shops.list({ where }),
  });
}

export function useCreateShop(onSuccess?: (data: ShopDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ShopCreateDTO) => api.shops.create(data),
    onError: (error) => {
      console.log('Error Creating Shop', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Shop created !');
      await queryClient.invalidateQueries({ queryKey: ['shops'] });
      onSuccess?.(data);
    },
  });
}

export function useUpdateShop(onSuccess?: (data: ShopDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ShopUpdateDTO & { id: number }) =>
      api.shops.update(data.id, data),
    onError: (error) => {
      console.log('Error Updating Shop', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Shop updated !');
      await queryClient.invalidateQueries({ queryKey: ['shops'] });
      onSuccess?.(data);
    },
  });
}

export function useDeleteShop(onSuccess?: () => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.shops.delete(id),
    onError: (error) => {
      console.log('Error Deleting Shop', error);
      toastError(error);
    },
    onSuccess: async () => {
      onSuccess?.();
      toast.success('Shop Deleted !');
      await queryClient.invalidateQueries({ queryKey: ['shops'] });
    },
  });
}
