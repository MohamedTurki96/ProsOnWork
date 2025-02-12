import { RouteObject } from 'react-router-dom';
import { Routes } from './routes';
import Guest from '../components/Guest';
import { AuthLayout } from '../../pages/auth/layout';
import { Register } from '../../pages/auth/Register';
import { Login } from '../../pages/auth/Login';

export const authRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <Guest>
        <AuthLayout />
      </Guest>
    ),
    children: [
      {
        path: Routes.login,
        element: <Login />,
      },
      {
        path: Routes.register,
        element: <Register />,
      },
    ],
  },
];
