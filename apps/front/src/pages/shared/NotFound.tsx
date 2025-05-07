import { Link } from 'react-router-dom';

import { Routes } from '../../router/routes/routes';

export function NotFound() {
  return (
    <div className="d-flex justify-content-center vh-100 overflow-auto flex-column error-404">
      <div className="contacts-overlay-img d-none d-md-block">
        <img src="/assets/img/bg/bg-07.png" alt="img" className="img-fluid" />
      </div>
      <div className="authentication-header">
        <div className="container">
          <div className="col-md-12">
            <div className="text-center">
              <img className="w-25 h-25" src="/logo.svg" alt="logo" />
            </div>
          </div>
        </div>
      </div>

      <div className="main-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 mx-auto">
              <div className="img-success d-flex justify-content-center mx-auto">
                <img
                  src="/assets/img/bg/error-404.png"
                  alt="Img"
                  className="img-fluid"
                />
              </div>
              <div>
                <h1 className="text-center display-6 mb-2">
                  404 Oups ! Page non trouvée
                </h1>
                <div className="text-center mb-4">
                  <span className="text-gray fs-14">
                    Cette page n'existe pas ou a été supprimée ! Nous vous
                    invitons à revenir à l'accueil.
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <Link
                    to={Routes.home}
                    className="btn btn-dark d-flex align-items-center"
                  >
                    <i className="ti ti-circle-arrow-left me-1"></i>Retour à
                    l'accueil
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
