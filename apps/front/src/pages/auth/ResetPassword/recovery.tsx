import React, { FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useRequestPasswordReset } from '../../../hooks/useAuth';
import { Routes } from '../../../router/routes/routes';

export function PasswordRecovery() {
  const { mutate } = useRequestPasswordReset();

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    mutate({
      email: formData.get('email')! as string,
    });
  }, []);

  return (
    <div className="col-md-5 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column justify-content-center">
          <div className="card p-sm-4 my-5">
            <div className="card-body">
              <div className="text-center mb-3">
                <h3 className="mb-2">Mot de passe oublié&nbsp;?</h3>
                <p>
                  Saisissez votre e-mail&nbsp;: nous vous enverrons un code OTP
                  pour réinitialiser votre mot de passe.
                </p>
              </div>

              <div className="mb-3">
                <label className="form-label">Adresse&nbsp;e-mail</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  name="email"
                />
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-lg btn-linear-primary w-100"
                >
                  Envoyer
                </button>
              </div>

              <div className="d-flex justify-content-center">
                <p className="mb-0">
                  Vous souvenez-vous de votre mot de passe&nbsp;?{' '}
                  <Link to={Routes.login} className="text-primary">
                    Se connecter
                  </Link>
                </p>
              </div>

              <img
                src="assets/img/bg/authentication-bg.png"
                className="bg-left-top"
                alt="Image décorative"
              />
              <img
                src="assets/img/bg/authentication-bg.png"
                className="bg-right-bottom"
                alt="Image décorative"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
