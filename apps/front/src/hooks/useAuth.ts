import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { UserCreateDTO, UserLoginDTO } from '../api';
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
      toastError();
    },
  });
}

export function useRegister() {
  const api = useApi();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: UserCreateDTO) => api.users.register(data),
    onError: (error) => {
      console.log('Error registering', error);
      toastError();
    },
    onSuccess: () => {
      toast.success('User registered successfully');
      navigate(Routes.login);
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
