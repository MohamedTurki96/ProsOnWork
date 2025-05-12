import { RouteObject } from 'react-router-dom';

import { PublicLayout } from '../../pages/layout/public';
import { Categories } from '../../pages/public/Categories';
import { Home } from '../../pages/public/Home';
import { Search } from '../../pages/public/Search';
import { ServiceDetails } from '../../pages/public/ServiceDetails';

import { Routes } from './routes';

export const publicRoutes: RouteObject[] = [
  {
    path: '',
    element: <PublicLayout />,
    children: [
      {
        path: Routes.home,
        element: <Home />,
      },
      {
        path: Routes.categories,
        element: <Categories />,
      },
      {
        path: Routes.search,
        element: <Search />,
      },
      {
        path: Routes.products,
        element: <Search />,
      },
      {
        path: `${Routes.products}/:id`,
        element: <ServiceDetails />,
      },
    ],
  },
];
