import { Link, useNavigate } from 'react-router-dom';

import { UserRole } from '../../../api';
import { Img } from '../../../components/Img';
import { useConnectedUser, useLogout } from '../../../hooks/useAuth';
import { Routes } from '../../../router/routes/routes';

export function Header() {
  const { data: user } = useConnectedUser();
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            <Link to={Routes.home} className="navbar-brand logo">
              <img src="/logo.svg" alt="logo" className="img-fluid" />
            </Link>
            <Link to={Routes.home} className="navbar-brand logo-small">
              <img src="/logo.svg" alt="logo" className="img-fluid" />
            </Link>
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to={Routes.home} className="menu-logo">
                <img src="/logo.svg" alt="logo" className="img-fluid" />
              </Link>
            </div>
          </div>
          {user ? (
            <>
              <div className="header-btn d-flex align-items-center">
                <div className="provider-head-links">
                  <a
                    href="#"
                    className="d-flex align-items-center justify-content-center me-2 notify-link"
                    data-bs-toggle="dropdown"
                  >
                    <i className="feather icon-bell"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end notification-dropdown p-4">
                    <div className="d-flex dropdown-body align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
                      <h6 className="notification-title">
                        Notifications
                        <span className="fs-18 text-gray"> (2)</span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <a href="#" className="text-primary fs-15 me-3 lh-1">
                          Mark all as read
                        </a>
                        <div className="dropdown">
                          <a
                            href="#"
                            className="bg-white dropdown-toggle"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                          >
                            <i className="ti ti-calendar-due me-1"></i>Today
                          </a>
                          <ul className="dropdown-menu mt-2 p-3">
                            <li>
                              <a href="#" className="dropdown-item rounded-1">
                                This Week
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item rounded-1">
                                Last Week
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item rounded-1">
                                Last Week
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="noti-content">
                      <div className="d-flex flex-column">
                        <div className="border-bottom mb-3 pb-3">
                          <a>
                            <div className="d-flex">
                              <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <img
                                  src="assets/img/profiles/avatar-52.jpg"
                                  alt="Profile"
                                  className="rounded-circle"
                                />
                              </span>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center">
                                  <p className="mb-1 w-100">
                                    <span className="text-dark fw-semibold">
                                      Stephan Peralt
                                    </span>
                                    rescheduled the service to 14/01/2024.
                                  </p>
                                  <span className="d-flex justify-content-end ">
                                    <i className="ti ti-point-filled text-primary"></i>
                                  </span>
                                </div>
                                <span>Just Now</span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="border-bottom mb-3 pb-3">
                          <a className="pb-0">
                            <div className="d-flex">
                              <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <img
                                  src="assets/img/profiles/avatar-36.jpg"
                                  alt="Profile"
                                  className="rounded-circle"
                                />
                              </span>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center">
                                  <p className="mb-1 w-100">
                                    <span className="text-dark fw-semibold">
                                      Harvey Smith
                                    </span>
                                    has requested your service.
                                  </p>
                                  <span className="d-flex justify-content-end ">
                                    <i className="ti ti-point-filled text-primary"></i>
                                  </span>
                                </div>
                                <span>5 mins ago</span>
                                <div className="d-flex justify-content-start align-items-center mt-2">
                                  <span className="btn btn-light btn-sm me-2">
                                    Deny
                                  </span>
                                  <span className="btn btn-dark btn-sm">
                                    Accept
                                  </span>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="border-bottom mb-3 pb-3">
                          <a>
                            <div className="d-flex">
                              <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <img
                                  src="assets/img/profiles/avatar-02.jpg"
                                  alt="Profile"
                                  className="rounded-circle"
                                />
                              </span>
                              <div className="flex-grow-1">
                                <p className="mb-1">
                                  <span className="text-dark fw-semibold">
                                    Anthony Lewis
                                  </span>
                                  has left feedback for your recent service
                                </p>
                                <span>10 mins ago</span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="border-0 mb-3 pb-0">
                          <a>
                            <div className="d-flex">
                              <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <img
                                  src="assets/img/profiles/avatar-22.jpg"
                                  alt="Profile"
                                  className="rounded-circle"
                                />
                              </span>
                              <div className="flex-grow-1">
                                <p className="mb-1">
                                  <span className="text-dark fw-semibold">
                                    Brian Villaloboshas
                                  </span>
                                  cancelled the service scheduled for
                                  14/01/2024.
                                </p>
                                <span>15 mins ago</span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex p-0 notification-footer-btn">
                      <a href="#" className="btn btn-light rounded  me-2">
                        Cancel
                      </a>
                      <a href="#" className="btn btn-dark rounded ">
                        View All
                      </a>
                    </div>
                  </div>
                </div>
                <div className="provider-head-links">
                  <a
                    className="d-flex align-items-center justify-content-center me-2"
                    onClick={() => navigate(Routes.chat)}
                  >
                    <i className="feather icon-mail"></i>
                  </a>
                </div>
                <div className="dropdown">
                  <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="booking-user d-flex align-items-center">
                      <span className="user-img">
                        <Img mediaId={user.avatarId} alt="user" />
                      </span>
                    </div>
                  </a>
                  <ul className="dropdown-menu p-2">
                    <li>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                        onClick={() =>
                          navigate(
                            user.role == UserRole.Client
                              ? Routes.dashbaord
                              : user.role == UserRole.ServiceProvider
                                ? Routes.provider
                                : Routes.admin,
                          )
                        }
                      >
                        <i className="ti ti-dashboard me-1"></i>Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                        onClick={() => logout()}
                      >
                        <i className="ti ti-logout me-1"></i>Logout
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="header__hamburger d-lg-none my-auto">
                  <div className="sidebar-menu">
                    <i className="fa-solid fa-bars"></i>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <Link to={Routes.register} className="nav-link header-reg">
                  Créer un compte
                </Link>
              </li>
              <li className="nav-item">
                <Link to={Routes.login} className="nav-link header-login">
                  <i className="fa-regular fa-circle-user me-2"></i>Se connecter
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
