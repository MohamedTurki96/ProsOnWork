import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ReservationDTO, ReservationListWhereDTO } from '../api';

import { useApi } from './useApi';
import { toastError } from './utils';

export function useReservation(id?: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['reservations', id],
    queryFn: () => api.reservations.get(id!),
    enabled: !!id,
  });
}

export function useReservations(where: ReservationListWhereDTO) {
  const api = useApi();

  return useQuery({
    queryKey: ['reservations',where],
    queryFn: () => api.reservations.list({ where }),
  });
}

export function useReservationCancel(
  onSuccess?: (data: ReservationDTO) => any,
) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.reservations.cancel(id),
    onError: (error) => {
      console.log('Error Canceling Reservation', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Reservation canceled!');
      await queryClient.invalidateQueries({ queryKey: ['reservations'] });
      onSuccess?.(data);
    },
  });
}
