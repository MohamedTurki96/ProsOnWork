import { RouteObject } from 'react-router-dom';

import { UserRole } from '../../api';
import { Dashboard } from '../../pages/client/Dashboard';
import { Reservations } from '../../pages/client/Reservations';
import { DashboardLayout } from '../../pages/layout/dashboard';
import { Settings } from '../../pages/shared/Settings';
import { Wallet } from '../../pages/shared/Wallet';
import Granted from '../components/Granted';

import { Routes } from './routes';

export const clientRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <Granted roles={[UserRole.Client]}>
        <DashboardLayout />
      </Granted>
    ),
    children: [
      { path: Routes.dashbaord, element: <Dashboard /> },
      { path: Routes.reservations, element: <Reservations /> },
      { path: Routes.wallet, element: <Wallet /> },
      { path: Routes.settings, element: <Settings /> },
    ],
  },
];
