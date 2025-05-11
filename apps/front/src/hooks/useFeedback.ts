import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { FeedbackCreateDTO, FeedbackDTO } from '../api';

import { useApi } from './useApi';
import { toastError } from './utils';


export function useFeedback(userId?: number, productId?: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['feedback', userId, productId],
    queryFn: () => api.feedback.getFeedbackFor(productId!, userId!),
    enabled: !!userId && !!productId,
  });
}

export function useFeedbackForProduct(productId?: number) {
  const api = useApi();

  return useQuery({
    queryKey: ['feedback', productId],
    queryFn: () => api.feedback.listByProduct(productId!),
    enabled: !!productId,
  });
}


export function useCreateFeedback(onSuccess?: (data: FeedbackDTO) => any) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FeedbackCreateDTO) => api.feedback.create(data),
    onError: (error) => {
      console.log('Error Creating feedback', error);
      toastError(error);
    },
    onSuccess: async (data) => {
      toast.success('Feedback created !');
      await queryClient.invalidateQueries({ queryKey: ['feedback', data.userId, data.productId] });
      onSuccess?.(data);
    },
  });
}