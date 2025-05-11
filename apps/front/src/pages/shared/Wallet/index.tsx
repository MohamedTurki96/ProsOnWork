import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { PaymentType } from '../../../api';
import { AppLoader } from '../../../components/AppLoader';
import { useCreateCashIn, usePayments } from '../../../hooks/usePayments';
import { useWalletByUser } from '../../../hooks/useWallet';

export function Wallet() {
  const { data: wallet } = useWalletByUser();
  const { data: payments } = usePayments(
    {
      walletId: wallet?.id,
    },
    !!wallet?.id,
  );
  const [amount, setAmount] = useState(0);
  const closeRefCreate = useRef<HTMLAnchorElement>(null);
  const { mutate } = useCreateCashIn(() => {
    closeRefCreate.current?.click()
  });

  const credits = useMemo(() => {
    if (payments && wallet) {
      return payments.items
        .filter((p) => p.type == PaymentType.CashIn)
        .reduce((x, cum) => x + cum.amount, 0);
    }

    return 0;
  }, [wallet, payments]);

  if (!wallet || !payments) {
    return <AppLoader />;
  }

  return (
    <>
      <div className="col">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
          <h4>Wallet</h4>
          <div>
            <Link
              to="#"
              className="btn btn-dark btn-sm d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add-amount"
            >
              <i className="ti ti-square-rounded-plus me-1" />
              Alimenter
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg col-md-3">
            <div className="card p-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <span className="wallet-icon bg-gray rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-wallet" />
                  </span>
                </div>
                <div>
                  <span className="fs-13 text-gray text-truncate">Balance</span>
                  <h6 className="fs-18">${wallet?.balance}</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg col-md-3 ">
            <div className="card p-3 ">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <span className="wallet-icon bg-gray rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-wallet" />
                  </span>
                </div>
                <div>
                  <span className="fs-13 text-gray">Total Credit</span>
                  <h6 className="fs-18">${credits}</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg col-md-3 ">
            <div className="card p-3 ">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <span className="wallet-icon bg-gray rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-wallet" />
                  </span>
                </div>
                <div>
                  <span className="fs-13 text-gray">Total Debit</span>
                  <h6 className="fs-18">${wallet.balance > credits ? 0 : credits - wallet.balance}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h6>Transactions</h6>
        </div>
        <div className="row">
          <div className="col-12 ">
            <div className="table-resposnive">
              <table className="table mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.items.map((payment) => {
                    return (
                      <tr>
                        <td>
                          <p className="fs-14">{payment.type}</p>
                        </td>
                        <td>
                          <span className="text-success">{payment.amount}</span>
                        </td>
                        <td>
                          <p className="text-gray fs-14">{payment.createdAt}</p>
                        </td>
                        <td>
                          <p className="fs-14">{payment.status}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade custom-modal"
        id="add-amount"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Alimenter wallet</h5>
              <Link
                to="#"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRefCreate}
                onClick={() => setAmount(0)}
              >
                <i className="ti ti-circle-x-filled fs-20" />
              </Link>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Amount</label>
                          <input
                            type="number"
                            className="form-control"
                            onChange={(e) => setAmount(Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => mutate({ amount })}
                disabled={!!!amount}
              >
                Alimenter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
