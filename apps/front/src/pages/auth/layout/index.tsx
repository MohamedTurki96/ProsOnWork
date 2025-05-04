import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { AuthHeader } from './Header';
import { AuthFooter } from './Footer';

export function AuthLayout() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    import('../../../style/scss/main.scss');
  }, []);

  return (
    <div className="authentication-page">
      <div className="d-flex justify-content-between vh-100 overflow-auto flex-column">
        <AuthHeader />
        <Outlet />
        <AuthFooter />
      </div>
    </div>
  );
}
