import { RouteObject } from 'react-router-dom';

import { UserRole } from '../../api';
import { Categories } from '../../pages/admin/Categories';
import { Dashboard } from '../../pages/admin/Dashboard';
import { Payouts } from '../../pages/admin/Payouts';
import { Reclamations } from '../../pages/admin/Reclamations';
import { DashboardLayout } from '../../pages/layout/dashboard';
import { Security } from '../../pages/shared/Security';
import { Settings } from '../../pages/shared/Settings';
import Granted from '../components/Granted';

import { Routes } from './routes';



export const adminRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <Granted roles={[UserRole.Admin]}>
        <DashboardLayout />
      </Granted>
    ),
    children: [
      { path: Routes.admin, element: <Dashboard /> },
      { path: Routes.adminCategories, element: <Categories /> },
      { path: Routes.payouts, element: <Payouts /> },
      { path: Routes.reclamations, element: <Reclamations /> },
      { path: Routes.adminSettigs, element: <Settings /> },
      { path: Routes.adminSecurity, element: <Security /> },
    ],
  },
];
