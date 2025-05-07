import { RouteObject } from 'react-router-dom';

import { Login } from '../../pages/auth/Login';
import { Register } from '../../pages/auth/Register';
import { AuthLayout } from '../../pages/auth/layout';
import Guest from '../components/Guest';

import { Routes } from './routes';

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
