import { Link } from 'react-router-dom';

import { ReclamationDTO, ReclamationStatus } from '../../../api';
import { AppLoader } from '../../../components/AppLoader';
import { Img } from '../../../components/Img';
import { useProduct } from '../../../hooks/useProducts';
import {
  useReclamationProgress,
  useReclamations,
  useReclamationSolve,
} from '../../../hooks/useReclamation';
import { useUser } from '../../../hooks/useUser';
import { Routes } from '../../../router/routes/routes';

export function Reclamations() {
  const { data: reclamations } = useReclamations();

  if (!reclamations) {
    return <AppLoader />;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h5>Réclamations</h5>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-12 col-lg-12">
          <div className="custom-datatable-filter table-responsive">
            <table className="table datatable">
              <thead className="thead-light">
                <tr>
                  <th>Utilisateur</th>
                  <th>Produit</th>
                  <th>Commentaire</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reclamations.items.map((reclamation) => {
                  return (
                    <ReclamationLine
                      reclamation={reclamation}
                      key={reclamation.id}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

type ReclamationLineProps = {
  reclamation: ReclamationDTO;
};

function ReclamationLine({ reclamation }: ReclamationLineProps) {
  const { data: user } = useUser(reclamation.userId);
  const { data: product } = useProduct(reclamation.productId);
  const { mutate: progress } = useReclamationProgress();
  const { mutate: solve } = useReclamationSolve();

  if (!user || !product) {
    return null;
  }

  return (
    <tr>
      <td>
        <div className="booking-user d-flex align-items-center">
          <span className="user-img me-2">
            <Img mediaId={user.avatarId} alt="user" />
          </span>
          <span>{user.name}</span>
        </div>
      </td>
      <td>
        <Link to={`${Routes.products}/${product.id}`}>{product.name}</Link>
      </td>
      <td>{reclamation.comment}</td>
      <td>
        <span
          className={`badge badge-${reclamation.status == ReclamationStatus.Resolved ? 'success' : reclamation.status == ReclamationStatus.Open ? 'primary' : 'warning'}`}
        >
          {reclamation.status}
        </span>
      </td>
      <td>
        {reclamation.status == ReclamationStatus.Open ? (
          <>
            <button
              className="me-2 btn btn-secondary"
              onClick={() => progress(reclamation.id)}
            >
              Solve
            </button>
          </>
        ) : reclamation.status == ReclamationStatus.InProgress ? (
          <>
            <button
              className="me-2 btn btn-secondary"
              onClick={() => solve(reclamation.id)}
            >
              Close
            </button>
            <button className="me-2 btn btn-secondary">Chat</button>
          </>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
}
