import { useNavigate } from 'react-router-dom';

import { Routes } from '../../../router/routes/routes';

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="col-md-5">
      <form onSubmit={() => navigate(Routes.login)}>
        <div className="d-flex flex-column justify-content-center">
          <div className="card p-sm-4">
            <div className="card-body">
              <div className="text-center">
                <span className="success-check mb-3 mx-auto">
                  <i className="ti ti-check" />
                </span>
                <h4 className="mb-2">Success</h4>
                <div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-linear-primary w-100"
                  >
                    Back to Sign In
                  </button>
                </div>
              </div>
            </div>
            <div>
              <img
                src="assets/img/bg/authentication-bg.png"
                className="bg-left-top"
                alt="Img"
              />
              <img
                src="assets/img/bg/authentication-bg.png"
                className="bg-right-bottom"
                alt="Img"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Success;
