import { Outlet } from 'react-router-dom';

import { Header } from '../header';

import { Sidebar } from './sidebar';


export function DashboardLayout() {
  return (
    <div className={`body-two home-page-five`}>
      <div className={`main-wrapper`}>
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-3 col-lg-4">
                  <Sidebar />
                </div>
                <div className="col-xl-9 col-lg-8">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
