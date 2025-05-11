import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

import { Routes } from '../../../router/routes/routes';

export function AuthLayout() {
  return (
    <div className="d-flex justify-content-center vh-100 overflow-auto flex-column error-404">
      <div className="contacts-overlay-img d-none d-md-block">
        <img src="/assets/img/bg/bg-07.png" alt="img" className="img-fluid" />
      </div>
      <div className="authentication-header">
        <div className="container">
          <div className="col-md-12">
            <div className="text-center">
              <Link to={Routes.home}>
                <img src="/logo.svg" alt="logo" className="h-50 w-25" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="main-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
