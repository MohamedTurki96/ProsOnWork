import { RouteObject } from 'react-router-dom';
import { ClientLayout } from '../../pages/client/layout';
import { Routes } from './routes';
import { Home } from '../../pages/client/Home';
import { Categories } from '../../pages/client/Categories';
import { Search } from '../../pages/client/Search';
import { ServiceDetails } from '../../pages/client/ServiceDetails';

export const clientRoutes: RouteObject[] = [
  {
    path: '',
    element: <ClientLayout />,
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
