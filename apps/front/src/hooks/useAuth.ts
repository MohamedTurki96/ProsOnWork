import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from './useApi';
import { LoginRequest, RegisterRequest } from '../api';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../router/routes/routes';

const clearData = () => {
  localStorage.removeItem('access_token');
  document.cookie =
    'laravel_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export function useLogin() {
  const api = useApi();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => api.authentication.login(data),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token || '');
      setTimeout(() => navigate('/'), 1000);
    },
    onError: (error) => {
      console.log('Error logging in', error);
    },
  });
}

export function useRegister() {
  const api = useApi();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => api.authentication.register(data),
    onError: (error) => {
      console.log('Error registering', error);
    },
    onSuccess: () => {
      navigate(Routes.login);
    },
  });
}

export function useLogout() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.authentication.logout(),
    onSuccess: () => {
      clearData();
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error) => {
      console.log('Error logging out', error);
    },
  });
}

export function useConnectedUser() {
  const api = useApi();

  const query = useQuery({
    queryKey: ['me'],
    queryFn: () => api.authentication.me(),
    enabled: !!localStorage.getItem('access_token'),
  });

  if (query.isError) {
    clearData();
  }

  return query;
}
