import { Link } from 'react-router-dom';
import { Routes } from '../../../../router/routes/routes';

export function Footer() {
  return (
    <footer className="footer footer-5">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link to={Routes.home}>
                    <img src="/logo.svg" alt="logo" />
                  </Link>
                </div>
                <div className="footer-content">
                  <div>
                    <p className="fs-16">
                      <span className="ti ti-device-mobile me-2"></span>123 -
                      456 - 789
                    </p>
                  </div>
                  <div>
                    <p className="fs-16">
                      <span className="ti ti-mail me-2"></span>
                      hello&#64;prosonwork.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-widget">
                <h2 className="footer-title">Restez en contact avec nous</h2>
                <div className="social-icon">
                  <ul className="mb-0">
                    <li>
                      <a href="#">
                        <i className="ti ti-brand-facebook"></i>{' '}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti ti-brand-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti ti-brand-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-widget">
                <h2 className="footer-subtitle">Inscription à la newsletter</h2>
                <div className="subscribe-form mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email Address"
                  />
                  <button
                    type="submit"
                    className="btn footer-btn btn-dark d-flex justify-content-center align-items-center"
                  >
                    <i className="feather icon-send"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
