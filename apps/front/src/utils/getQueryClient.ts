import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export function getQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        staleTime: 10 * (60 * 1000),
      },
      mutations: {
        retry: false,
      },
    },
  });
}
