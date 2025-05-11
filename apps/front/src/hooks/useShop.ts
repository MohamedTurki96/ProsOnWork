import { useQuery } from '@tanstack/react-query';

import { useApi } from './useApi';

export function useShop(id?: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['shops', id],
    queryFn: () => api.shops.get(id!),
    enabled: !!id,
  });
}
