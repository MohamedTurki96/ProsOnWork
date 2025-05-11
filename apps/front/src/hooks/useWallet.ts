import { useQuery } from '@tanstack/react-query';

import { useApi } from './useApi';

export function useWallet(id: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['wallets', id],
    queryFn: () => api.wallets.get(id),
    enabled: !!id,
  });
}

export function useWalletByUser() {
  const api = useApi();

  return useQuery({
    queryKey: ['wallet-by-user'],
    queryFn: () => api.wallets.getByUser(),
  });
}
