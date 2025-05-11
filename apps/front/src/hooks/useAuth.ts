import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import {
  ChangePasswordDTO,
  RequestPasswordResetDTO,
  ResetPasswordDTO,
  UserCreateDTO,
  UserLoginDTO,
  VerifyEmailDTO,
} from '../api';
import { Routes } from '../router/routes/routes';

import { useApi, useLocalStorage } from './useApi';
import { toastError } from './utils';

export function useLogin() {
  const api = useApi();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserLoginDTO) => api.auth.login(data),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.token || '');
      queryClient.setQueriesData({ queryKey: ['me'] }, data.user);
      setTimeout(() => navigate(Routes.base), 1000);
      toast.success('Welcome back');
    },
    onError: (error) => {
      console.log('Error logging in', error);
      toastError(error);
    },
  });
}

export function useRegister() {
  const api = useApi();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: UserCreateDTO) => api.users.register(data),

    onSuccess: () => {
      toast.success('User registered successfully');
      navigate(Routes.login);
    },
    onError: (error) => {
      console.log('Error registering', error);
      toastError(error);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [_, setToken] = useLocalStorage();

  return useCallback(() => {
    setToken(null);
    queryClient.setQueriesData({ queryKey: ['me'] }, null);
    navigate(Routes.home);
    toast.success('Goodbye!');
  }, [navigate, queryClient]);
}

export function useRequestPasswordReset() {
  const api = useApi();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RequestPasswordResetDTO) => api.auth.requestReset(data),
    onError: (error) => {
      console.log('Error requesting', error);
      toastError(error);
    },
    onSuccess: () => {
      toast.success('Request sent');
      navigate(Routes.login);
    },
  });
}

export function useConnectedUser() {
  const api = useApi();
  const [token, setToken] = useLocalStorage();

  const query = useQuery({
    queryKey: ['me'],
    queryFn: () => api.users.me(),
    enabled: !!token,
  });

  if (query.isError) {
    setToken(null);
  }

  return query;
}

export function useVerifyEmail(onSuccess: () => any, onError: () => any) {
  const api = useApi();

  return useMutation({
    mutationFn: (data: VerifyEmailDTO) => api.auth.verifyEmail(data),
    onError: (error) => {
      onError();
    },
    onSuccess: () => {
      onSuccess();
    },
  });
}

export function useResetPassword(onSuccess: () => any, onError: () => any) {
  const api = useApi();

  return useMutation({
    mutationFn: (data: ResetPasswordDTO) => api.auth.resetPassword(data),
    onError: (error) => {
      onError();
    },
    onSuccess: () => {
      onSuccess();
    },
  });
}

export function useChangePassword(onSuccess?: () => any) {
  const api = useApi();

  return useMutation({
    mutationFn: (data: ChangePasswordDTO) => api.auth.changePassword(data),
    onError: (error) => {
      console.log('Error requesting', error);
      toastError(error);
    },
    onSuccess: () => {
      toast.success('Password changed');
      onSuccess?.();
    },
  });
}
