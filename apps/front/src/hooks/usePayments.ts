import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  PaymentCreateCashInDTO,
  PaymentDTO,
  PaymentListWhereDTO,
} from '../api';

import { useApi } from './useApi';
import { toastError } from './utils';

export function usePayments(
  where: PaymentListWhereDTO,
  enabled: boolean | undefined = true,
) {
  const api = useApi();

  return useQuery({
    queryKey: ['payments', ...(where?.walletId ? [where.walletId] : [])],
    queryFn: () => api.payments.list({ where }),
    enabled,
  });
}

export function usePaymentCashoutAccept(onSuccess?: (data: PaymentDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.payments.acceptCashout(id),
    onError: (error) => {
      console.log('Error Updating Payment', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Payment status updated !');
      await queryClient.invalidateQueries({ queryKey: ['payments'] });
      onSuccess?.(data);
    },
  });
}

export function usePaymentCashoutDecline(
  onSuccess?: (data: PaymentDTO) => any,
) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.payments.declineCashout(id),
    onError: (error) => {
      console.log('Error Updating Payment', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Payment status updated !');
      await queryClient.invalidateQueries({ queryKey: ['payments'] });
      onSuccess?.(data);
    },
  });
}

export function useCreateCashIn(onSuccess: () => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PaymentCreateCashInDTO) =>
      api.payments.createCashIn(data),
    onError: (error) => {
      console.log('Error Creating Payment', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      onSuccess?.();
      toast.success('CashIn created !');
      await queryClient.invalidateQueries({
        queryKey: ['payments', data.walletId],
      });
      await queryClient.invalidateQueries({
        queryKey: ['wallets', data.walletId],
      });
      await queryClient.invalidateQueries({
        queryKey: ['wallet-by-user'],
      });
    },
  });
}
