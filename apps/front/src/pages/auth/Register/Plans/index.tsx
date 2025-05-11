import { UserPlan } from '../../../../api';
import { usePlans } from '../../../../hooks/useUser';

type PlansProps = {
  onClick: (plan: UserPlan) => any;
};

export function Plans({ onClick }: PlansProps) {
  const { data } = usePlans();

  if (!data) return null;

  return (
    <div className="page-wrapper subscription">
      <div className="content content-two">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <div className="price-level">
                    <h6 className="fs-14">Basique</h6>
                  </div>
                  <h1 className="d-flex align-items-center">
                    {data.basic}
                    <span className="text-gray fs-12 ms-2">/ mois</span>
                  </h1>
                </div>

                <div className="card-body">
                  <ul>
                    <li>
                      <i className="ti ti-square-rounded-check me-1 text-success" />
                      10&nbsp;services
                    </li>
                    <li>
                      <i className="ti ti-square-rounded-check me-1 text-success" />
                      10&nbsp;employés
                    </li>
                    <li>
                      <i className="ti ti-square-rounded-check me-1 text-success" />
                      100&nbsp;rendez-vous
                    </li>
                    <li>
                      <i className="ti ti-square-x me-1 text-danger" />
                      Services&nbsp;supplémentaires
                    </li>
                  </ul>

                  <div className="text-center d-flex align-items-center mt-2">
                    <button
                      onClick={() => onClick(UserPlan.Basic)}
                      className="btn btn-dark w-100 d-flex align-items-center justify-content-center"
                    >
                      Choisir l'offre
                      <i className="feather-arrow-right-circle ms-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card active business-card">
                <div className="card-header">
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <div className="price-level">
                        <h6 className="fs-14">Professionnel</h6>
                      </div>
                      <h1 className="d-flex align-items-center">
                        {data.business}{' '}
                        <span className="text-gray fs-12 ms-2">/ mois</span>
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <ul>
                    <li>
                      <i className="ti ti-square-rounded-check me-1 text-success" />
                      50&nbsp;services
                    </li>
                    <li>
                      <i className="ti ti-square-rounded-check me-1 text-success" />
                      20&nbsp;employés
                    </li>
                    <li>
                      <i className="ti ti-square-rounded-check me-1 text-success" />
                      500&nbsp;rendez-vous
                    </li>
                    <li>
                      <i className="ti ti-square-x me-1 text-danger" />
                      Services&nbsp;supplémentaires
                    </li>
                  </ul>

                  <div className="text-center d-flex align-items-center mt-2">
                    <button
                      onClick={() => onClick(UserPlan.Business)}
                      className="btn btn-dark w-100 d-flex align-items-center justify-content-center"
                    >
                      Choisir l'offre
                      <i className="feather-arrow-right-circle ms-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <div className="price-level">
                    <h6 className="fs-14">Entreprise</h6>
                  </div>
                  <h1 className="d-flex align-items-center">
                    {data.premium}{' '}
                    <span className="text-gray fs-12 ms-2">/ mois</span>
                  </h1>
                </div>

                <div className="card-body">
                  <ul>
                    <li>
                      <i className="ti ti-square-rounded-check me-1 text-success" />
                      ∞&nbsp;services
                    </li>
                    <li>
                      <i className="ti ti-square-rounded-check me-1 text-success" />
                      ∞&nbsp;employés
                    </li>
                    <li>
                      <i className="ti ti-square-rounded-check me-1 text-success" />
                      ∞&nbsp;rendez-vous
                    </li>
                    <li>
                      <i className="ti ti-square-rounded-check me-1 text-success" />
                      Services&nbsp;supplémentaires
                    </li>
                  </ul>

                  <div className="text-center d-flex align-items-center mt-2">
                    <button
                      onClick={() => onClick(UserPlan.Premium)}
                      className="btn btn-dark w-100 d-flex align-items-center justify-content-center"
                    >
                      Choisir l'offre
                      <i className="feather-arrow-right-circle ms-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
