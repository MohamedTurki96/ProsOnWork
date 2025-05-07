import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { queryToObject } from '../utils/queryToObject';

import { useApi } from './useApi';

export function useFilteredServices() {
  const api = useApi();
  const [searchParams] = useSearchParams();

  return useQuery({
    queryKey: ['products', 'filtered'],
    queryFn: () => api.products.listProducts(queryToObject(searchParams)),
  });
}

export function useProduct(id: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['products', id],
    queryFn: () => api.products.getProduct(id),
  });
}
