import { RouteObject } from 'react-router';

import { NotFound } from '../pages/shared/NotFound';

import DefaultRoute from './components/DefaultRoute';
import { adminRoutes } from './routes/adminRoutes';
import { authRoutes } from './routes/authRoutes';
import { chatRoutes } from './routes/chatRoutes';
import { clientRoutes } from './routes/clientRoutes';
import { professionalRoutes } from './routes/professionalRoutes';
import { publicRoutes } from './routes/publicRoutes';

export const router: RouteObject[] = [
  {
    path: '',
    element: <DefaultRoute />,
  },
  ...authRoutes,
  ...publicRoutes,
  ...clientRoutes,
  ...professionalRoutes,
  ...adminRoutes,
 ...chatRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
];
