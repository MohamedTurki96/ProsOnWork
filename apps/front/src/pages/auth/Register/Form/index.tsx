import { Link } from 'react-router-dom';

import { Routes } from '../../../../router/routes/routes';

type RegisterFormProps = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  extra?: JSX.Element
};

export function RegisterForm({ handleSubmit, extra }: RegisterFormProps) {
  return (
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
                    {extra && extra}
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
                          Doit comporter au moins 8 caractères
                        </p>
                      </div>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        min={8}
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
  );
}
