import { Link } from 'react-router-dom';

import { Routes } from '../../../../router/routes/routes';


type TermsConditionProps = {
  onAccept: () => any
}

export function TermsCondition(props: TermsConditionProps) {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="terms-content privacy-cont">
                <h3 className="mb-3">ProsOnWork - Conditions générales d'utilisation</h3>

                <p>
                  En accédant ou en utilisant ProsOnWork, vous acceptez d'être lié
                  par les présentes Conditions générales (« Conditions »).
                  Si vous n'êtes pas d'accord, veuillez ne pas utiliser la plateforme.
                </p>

                <ul>
                  <li>
                    <i className="ti ti-circle-check-filled text-primary me-1" />
                    <strong>Place de marché.</strong> ProsOnWork met simplement en
                    relation des professionnels indépendants (« Pros ») avec des
                    clients ; nous n'employons pas, ne supervisons pas et ne garantissons
                    pas la qualité de leurs prestations.
                  </li>
                  <li>
                    <i className="ti ti-circle-check-filled text-primary me-1" />
                    <strong>Paiements & litiges.</strong> Tous les paiements doivent
                    passer par notre prestataire de paiement. Les litiges sont
                    gérés conformément à notre Politique de litige
                  </li>
                  <li>
                    <i className="ti ti-circle-check-filled text-primary me-1" />
                    <strong>Utilisation légale.</strong> Il est interdit de proposer
                    ou de demander des services contraires aux lois ou réglementations
                    en vigueur.
                  </li>
                  <li>
                    <i className="ti ti-circle-check-filled text-primary me-1" />
                    <strong>Mises à jour.</strong> Nous pouvons modifier ces
                    Conditions à tout moment ; la poursuite de l'utilisation de la
                    plateforme vaut acceptation des Conditions révisées.
                  </li>
                </ul>

                <p>
                  Vos données personnelles sont traitées conformément à notre Politique de confidentialité.
                  ProsOnWork est fourni « tel quel » ; nous déclinons toute
                  responsabilité pour les dommages indirects ou consécutifs liés
                  à son utilisation.
                </p>

                <div className="terms-btn">
                  <Link to={Routes.home} className="btn btn-light me-3">
                    Refuser
                  </Link>
                  <button onClick={props.onAccept} className="btn btn-dark">
                    J'accepte
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
