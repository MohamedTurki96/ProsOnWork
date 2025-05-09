import { useMemo } from 'react';

import { UserRole } from '../api';
import { Routes } from '../router/routes/routes';

import { useConnectedUser } from './useAuth';

export type MenuItem = {
  label: string;
  icon: string;
  path: string;
};

export function useSidebarMenu(): MenuItem[] {
  const { data: user } = useConnectedUser();

  return useMemo<MenuItem[]>(() => {
    if (!user) {
      return [];
    }

    switch (user?.role) {
      case UserRole.Admin:
        return [
          {
            label: 'Dashboard',
            icon: 'ti ti-layout-grid',
            path: Routes.admin,
          },
          {
            label: 'Categories',
            icon: 'ti ti-device-mobile',
            path: Routes.adminCategories,
          },
          {
            label: 'Payouts',
            icon: 'ti ti-heart',
            path: Routes.payouts,
          },
          {
            label: 'Reclamations',
            icon: 'ti ti-wallet',
            path: Routes.reclamations,
          },
        ];
      case UserRole.Client:
        return [
          {
            label: 'Dashboard',
            icon: 'ti ti-layout-grid',
            path: Routes.dashbaord,
          },
          {
            label: 'Bookings',
            icon: 'ti ti-device-mobile',
            path: Routes.reservations,
          },
          {
            label: 'Wallet',
            icon: 'ti ti-wallet',
            path: Routes.wallet,
          },
          {
            label: 'Settings',
            icon: 'ti ti-settings',
            path: Routes.settings,
          },
        ];
      case UserRole.ServiceProvider:
        return [
          {
            label: 'Dashboard',
            icon: 'ti ti-layout-grid',
            path: Routes.provider,
          },
          {
            label: 'Services',
            icon: 'ti ti-device-mobile',
            path: Routes.services,
          },
          {
            label: 'Bookings',
            icon: 'ti ti-heart',
            path: Routes.bookings,
          },
          {
            label: 'Wallet',
            icon: 'ti ti-wallet',
            path: Routes.providerWallet,
          },
          {
            label: 'Reviews',
            icon: 'ti ti-wallet',
            path: Routes.reviews,
          },
          {
            label: 'Settings',
            icon: 'ti ti-settings',
            path: Routes.providerSettings,
          },
        ];
    }
  }, []);
}
