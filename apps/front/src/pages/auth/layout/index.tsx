import { Outlet } from 'react-router';

import { AuthFooter } from './Footer';
import { AuthHeader } from './Header';

export function AuthLayout() {
  return (
    <div className="authentication-page">
      <div className="d-flex justify-content-between overflow-auto flex-column">
        <AuthHeader />
        <Outlet />
        <AuthFooter />
      </div>
    </div>
  );
}
