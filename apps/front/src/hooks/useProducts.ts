import { useQuery } from '@tanstack/react-query';


import { ProductListWhereDTO } from '../api';

import { useApi } from './useApi';


export function useFilteredServices(where: ProductListWhereDTO) {
  const api = useApi();
  console.log(where)

  return useQuery({
    queryKey: ['products', where],
    queryFn: () => api.products.list({ where }),
    enabled: !!Object.keys(where)?.length
  });
}

export function useProduct(id?: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['products', id],
    queryFn: () => api.products.get(id!),
    enabled: !!id
  });
}
