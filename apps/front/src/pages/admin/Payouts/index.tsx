import { PaymentDTO, PaymentStatus, PaymentType } from '../../../api';
import { AppLoader } from '../../../components/AppLoader';
import { Img } from '../../../components/Img';
import {
  usePaymentCashoutAccept,
  usePaymentCashoutDecline,
  usePayments,
} from '../../../hooks/usePayments';
import { useUser } from '../../../hooks/useUser';
import { useWallet } from '../../../hooks/useWallet';

export function Payouts() {
  const { data: payments } = usePayments({
    type: PaymentType.CashOut,
  });

  if (!payments) {
    return <AppLoader />;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h5>Payouts</h5>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-12 col-lg-12">
          <div className="custom-datatable-filter table-responsive">
            <table className="table datatable">
              <thead className="thead-light">
                <tr>
                  <th>Utilisateur</th>
                  <th>Amount</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.items.map((payment) => {
                  return <PaymentLine payment={payment} key={payment.id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

type PaymentLineProps = {
  payment: PaymentDTO;
};

function PaymentLine({ payment }: PaymentLineProps) {
  const { data: wallet } = useWallet(payment.walletId);
  const { data: user } = useUser(wallet?.userId);
  const { mutate: accept } = usePaymentCashoutAccept();
  const { mutate: decline } = usePaymentCashoutDecline();

  if (!user || !wallet) {
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
      <td>{payment.amount}</td>
      <td>
        <span
          className={`badge badge-${payment.status == PaymentStatus.Completed ? 'success' : payment.status == PaymentStatus.Failed ? 'primary' : 'warning'}`}
        >
          {payment.status}
        </span>
      </td>
      <td>
        {payment.status == PaymentStatus.Pending ? (
          <>
            <button className="me-2 btn btn-secondary" onClick={() => accept(payment.id)}>Accept</button>
            <button className="me-2 btn btn-primary" onClick={() => decline(payment.id)}>Decline</button>
          </>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
}
