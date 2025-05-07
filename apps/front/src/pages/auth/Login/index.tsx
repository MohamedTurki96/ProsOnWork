import { FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useLogin } from '../../../hooks/useAuth';
import { Routes } from '../../../router/routes/routes';

export function Login() {
  const { mutate: login } = useLogin();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      login({
        email: formData.get('email')! as string,
        password: formData.get('password')! as string,
      });
    },
    [login],
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
                        <h3 className="mb-2">Bienvenue</h3>
                        <p>
                          Entrez vos identifiants pour accéder à votre compte
                        </p>
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
                          <a className="text-primary fw-medium text-decoration-underline mb-1 fs-14">
                            Mot de passe oublié ?
                          </a>
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
                          Se connecter
                        </button>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p>
                          Vous n'avez pas de compte ?
                          <Link
                            to={Routes.register}
                            className="text-primary ms-1"
                          >
                            Rejoignez-nous
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
