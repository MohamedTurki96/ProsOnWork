import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  ProductCreateDTO,
  ProductDTO,
  ProductListWhereDTO,
  ProductUpdateDTO,
} from '../api';

import { useApi } from './useApi';
import { toastError } from './utils';

export function useFilteredServices(where: ProductListWhereDTO) {
  const api = useApi();
  return useQuery({
    queryKey: ['products', where],
    queryFn: () => api.products.list({ where }),
    enabled: !!Object.keys(where)?.length,
  });
}

export function useProduct(id?: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['products', id],
    queryFn: () => api.products.get(id!),
    enabled: !!id,
  });
}

export function useCreateProduct(onSuccess?: (data: ProductDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductCreateDTO) => api.products.create(data),
    onError: (error) => {
      console.log('Error Creating Product', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Product created !');
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      onSuccess?.(data);
    },
  });
}

export function useUpdateProduct(onSuccess?: (data: ProductDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductUpdateDTO & { id: number }) =>
      api.products.update(data.id, data),
    onError: (error) => {
      console.log('Error Updating Product', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Product updated !');
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      onSuccess?.(data);
    },
  });
}

export function useDeleteProduct(onSuccess?: () => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.products.delete(id),
    onError: (error) => {
      console.log('Error Deleting ProductDTO', error);
      toastError(error);
    },
    onSuccess: async () => {
      onSuccess?.();
      toast.success('Product Deleted !');
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
