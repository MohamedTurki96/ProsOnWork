import { RouteObject } from 'react-router-dom';

import { EmailVerification } from '../../pages/auth/EmailVerification';
import { Login } from '../../pages/auth/Login';
import { ClientRegister } from '../../pages/auth/Register/Client';
import { ProviderRegister } from '../../pages/auth/Register/Provider';
import { ResetPassword } from '../../pages/auth/ResetPassword';
import { PasswordRecovery } from '../../pages/auth/ResetPassword/recovery';
import { AuthLayout } from '../../pages/layout/auth';
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
        element: <ClientRegister />,
      },
      {
        path: Routes.providerRegister,
        element: <ProviderRegister />,
      },
      {
        path: Routes.passwordRecovery,
        element: <PasswordRecovery />,
      },
      {
        path: Routes.resetPassword,
        element: <ResetPassword />,
      },
      {
        path: Routes.verifyEmail,
        element: <EmailVerification />,
      },
    ],
  },
];
