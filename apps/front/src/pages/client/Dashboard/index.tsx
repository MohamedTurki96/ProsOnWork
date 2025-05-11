import CountUp from 'react-countup';


export function Dashboard() {
  return (
    <div className="d-flex flex-column">
      <div className="row mb-4">
        <div className="col-xxl-4 col-md-6">
          <div className="card dash-widget">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="dash-icon bg-primary-transparent d-flex justify-content-center align-items-center rounded-circle">
                    <i className="ti ti-shopping-cart" />
                  </span>
                  <div className="ms-2">
                    <span className="fs-14">Total Orders</span>
                    <h5>
                      <span className="counter">
                        <CountUp end={27} duration={2} />
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-md-6">
          <div className="card dash-widget">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="dash-icon bg-secondary-transparent d-flex justify-content-center align-items-center rounded-circle">
                    <i className="ti ti-wallet" />
                  </span>
                  <div className="ms-2">
                    <span className="fs-14">Total Spend</span>
                    <h5>
                      ${' '}
                      <span className="counter">
                        <CountUp end={2500} duration={2} />
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-md-6">
          <div className="card dash-widget">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="dash-icon bg-success-transparent d-flex justify-content-center align-items-center rounded-circle ">
                    <i className="ti ti-cards" />
                  </span>
                  <div className="ms-2">
                    <span className="fs-14">Wallet</span>
                    <h5>
                      ${' '}
                      <span className="counter">
                        <CountUp end={200} duration={2} />
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex">
          <div className="w-100">
            <h5 className="mb-3">Recent Transaction</h5>
            <div className="table-responsive">
              <table className="table mb-0">
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                          <i className="ti ti-devices-2 fs-20 text-dark" />
                        </span>
                        <div>
                          <h6 className="fs-14">Service Booking</h6>
                          <span className="text-gray fs-12">
                            <i className="feather icon-calendar" />
                            22 Sep 2023
                            <span className="ms-2">
                              <i className="feather icon-clock" />
                              10:12 AM
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <h6>$280.00</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                          <i className="ti ti-refresh fs-20 text-dark" />
                        </span>
                        <div>
                          <h6 className="fs-14">Service Refund</h6>
                          <span className="text-gray fs-12">
                            <i className="feather icon-calendar" />
                            15 Oct 2022
                            <span className="ms-2">
                              <i className="ti ti-clock me-1" />
                              14:36 PM
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <h6>$395.00</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                          <i className="ti ti-wallet fs-20 text-dark" />
                        </span>
                        <div>
                          <h6 className="fs-14">Wallet Topup</h6>
                          <span className="text-gray fs-12">
                            <i className="feather icon-calendar" />
                            18 Oct 2022
                            <span className="ms-2">
                              <i className="ti ti-clock me-1" />
                              15:19 PM
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <h6>$1000.00</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                          <i className="ti ti-devices-2 fs-20 text-dark" />
                        </span>
                        <div>
                          <h6 className="fs-14">Service Booking</h6>
                          <span className="text-gray fs-12">
                            <i className="feather icon-calendar" />
                            28 Oct 2022
                            <span className="ms-2">
                              <i className="ti ti-clock me-1" />
                              11:17 AM
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <h6>$598.65</h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
