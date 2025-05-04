import { useQuery } from '@tanstack/react-query';

import { useApi } from './useApi';

export function useCategories() {
  const api = useApi();

  return useQuery({
    queryKey: ['categories'],
    queryFn: () => api.categories.list(),
  });
}
