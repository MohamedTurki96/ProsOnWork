import { RouteObject } from 'react-router-dom';

import { UserRole } from '../../api';
import { DashboardLayout } from '../../pages/layout/dashboard';
import { Bookings } from '../../pages/serviceProvider/Bookings';
import { Dashboard } from '../../pages/serviceProvider/Dashboard';
import { Reviews } from '../../pages/serviceProvider/Reviews';
import { Services } from '../../pages/serviceProvider/Services';
import { Security } from '../../pages/shared/Security';
import { Settings } from '../../pages/shared/Settings';
import { Wallet } from '../../pages/shared/Wallet';
import Granted from '../components/Granted';

import { Routes } from './routes';

export const professionalRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <Granted roles={[UserRole.ServiceProvider]}>
        <DashboardLayout />
      </Granted>
    ),
    children: [
      { path: Routes.provider, element: <Dashboard /> },
      { path: Routes.services, element: <Services /> },
      { path: Routes.bookings, element: <Bookings /> },
      { path: Routes.providerWallet, element: <Wallet /> },
      { path: Routes.reviews, element: <Reviews /> },
      { path: Routes.providerSettings, element: <Settings /> },
      { path: Routes.providerSecurity, element: <Security /> },
    ],
  },
];
