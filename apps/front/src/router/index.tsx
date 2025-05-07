import { RouteObject } from 'react-router';

import { NotFound } from '../pages/shared/NotFound';

import DefaultRoute from './components/DefaultRoute';
import { adminRoutes } from './routes/adminRoutes';
import { authRoutes } from './routes/authRoutes';
import { clientRoutes } from './routes/clientRoutes';
import { professionalRoutes } from './routes/professionalRoutes';

export const router: RouteObject[] = [
  {
    path: '',
    element: <DefaultRoute />,
  },
  ...authRoutes,
  ...clientRoutes,
  ...professionalRoutes,
  ...adminRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
];
