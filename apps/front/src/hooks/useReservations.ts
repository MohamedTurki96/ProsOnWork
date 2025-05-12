import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ReservationCreateDTO, ReservationDTO, ReservationListWhereDTO } from '../api';

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

export function useCreateReservation(onSuccess?: (data: ReservationDTO) => any) {
  const api = useApi();

  return useMutation({
    mutationFn: (data: ReservationCreateDTO) => api.reservations.create(data),
    onError: (error) => {
      console.log('Error Creating reservation', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Reservation created !');
      onSuccess?.(data);
    },
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

export function useReservationAccept(
  onSuccess?: (data: ReservationDTO) => any,
) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.reservations.accept(id),
    onError: (error) => {
      console.log('Error Accepting Reservation', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Reservation Accepted!');
      await queryClient.invalidateQueries({ queryKey: ['reservations'] });
      onSuccess?.(data);
    },
  });
}
