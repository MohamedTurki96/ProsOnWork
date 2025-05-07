import { FormEvent, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useRegister } from '../../../hooks/useAuth';
import { Routes } from '../../../router/routes/routes';

export function Register() {
  const [searchParams] = useSearchParams();
  const isProvider = !!searchParams.get('isProvider');

  const { mutate: register } = useRegister();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      register({
        isClient: !!formData.get('isClient'),
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });
    },
    [register],
  );

  return (
    <>
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
            <div className="col-md-5 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column justify-content-center">
                  <div className="card p-sm-4 my-5">
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <h3 className="mb-2">Inscription Utilisateur</h3>
                      </div>
                      <div className="mb-3">
                        <div className="form-group">
                          <label className="col-form-label">
                            S'inscrire comme
                          </label>
                          <div className="form-group coupon-radio">
                            <label className="custom_radio d-inline-block me-3">
                              <input
                                type="radio"
                                name="isClient"
                                defaultChecked={!isProvider}
                                value={1}
                              />
                              <span className="checkmark" /> Client
                            </label>
                            <label className="custom_radio d-inline-block">
                              <input
                                type="radio"
                                name="isClient"
                                defaultChecked={isProvider}
                                value={0}
                              />
                              <span className="checkmark" /> Prestataire
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Nom & Prénom</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <label className="form-label">Mot de passe</label>
                          <p className="text-gray-6 fw-medium mb-1">
                            Doit comporter au moins 6 caractères
                          </p>
                        </div>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <button
                          type="submit"
                          className="btn btn-lg btn-linear-primary w-100"
                        >
                          S'inscrire
                        </button>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p>
                          Vous avez déjà un compte ?
                          <Link to={Routes.login} className="text-primary">
                            Se connecter
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div>
                      <img
                        src="assets/img/bg/authentication-bg.png"
                        className="bg-left-top"
                        alt="Image"
                      />
                      <img
                        src="assets/img/bg/authentication-bg.png"
                        className="bg-right-bottom"
                        alt="Image"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
