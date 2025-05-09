import { Link } from 'react-router-dom';

import { Img } from '../../../components/Img';
import { useCategories } from '../../../hooks/useCategory';

export function Categories() {
  const { data: categories } = useCategories();

  if (!categories) {
    return null;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h5>Catégories</h5>
        <div className="d-flex align-items-center">
          <Link
            to="#"
            className="btn btn-dark d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#add-coupons"
          >
            <i className="ti ti-circle-plus me-2" />
            Ajouter
          </Link>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-12 col-lg-12">
          <div className="custom-datatable-filter table-responsive">
            <table className="table datatable">
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Icon</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.items.map((category) => {
                  return (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>
                        <Img
                          mediaId={category.iconId}
                          className="img-thumbnail"
                        />
                      </td>
                      <td>
                        <Img
                          mediaId={category.imageId}
                          className="img-thumbnail"
                          style={{
                            width: 120,
                            height: 80,
                            objectFit: 'cover',
                          }}
                        />
                      </td>
                      <td>
                        <div className="user-icon d-inline-flex">
                          <Link
                            to="#"
                            className="me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-coupons"
                          >
                            <i className="ti ti-edit" />
                          </Link>
                          <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#del-coupons"
                          >
                            <i className="ti ti-trash" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="modal fade custom-modal" id="add-category">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Add Coupon</h5>
              <Link to="#" data-bs-dismiss="modal" aria-label="Close">
                <i className="ti ti-circle-x-filled fs-20" />
              </Link>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Services</label>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Coupon Name</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Code</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Coupon Type</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Discount</label>
                          <div className=" input-icon position-relative">
                            <span className="input-icon-addon">
                              <i className="ti ti-square-rounded-percentage" />
                            </span>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Start Date</label>
                          <div className="react-calender input-icon position-relative">
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">End Date</label>
                          <div className="react-calender input-icon position-relative">
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Company Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="form-check form-switch d-flex align-items-center">
                            <input
                              className="form-check-input me-1"
                              type="checkbox"
                              role="switch"
                              id="switch-sm"
                              defaultChecked
                            />
                            <h6 className="fs-14">Once per Customer</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="d-flex  flex-column">
                          <label className="form-label">End Date</label>
                          <div className="d-flex">
                            <div className="form-check me-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                              >
                                Active
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault2"
                              >
                                Inactive
                              </label>
                            </div>
                          </div>
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
                className="btn bg-gray"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-dark">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade custom-modal" id="edit-coupons">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Edit Coupon</h5>
              <Link to="#" data-bs-dismiss="modal" aria-label="Close">
                <i className="ti ti-circle-x-filled fs-20" />
              </Link>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Services</label>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Coupon Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Black Friday"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Code</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="GIFTGUIDE"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Coupon Type</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Discount</label>
                          <div className=" input-icon position-relative">
                            <span className="input-icon-addon">
                              <i className="ti ti-square-rounded-percentage" />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="5%"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Start Date</label>
                          <div className="react-calender input-icon position-relative">
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">End Date</label>
                          <div className="react-calender input-icon position-relative">
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Company Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="form-check form-switch d-flex align-items-center">
                            <input
                              className="form-check-input me-1"
                              type="checkbox"
                              role="switch"
                              id="switch-sm"
                              defaultChecked
                            />
                            <h6 className="fs-14">Once per Customer</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="d-flex  flex-column">
                          <label className="form-label">End Date</label>
                          <div className="d-flex">
                            <div className="form-check me-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault3"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault3"
                              >
                                Active
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault4"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                Inactive
                              </label>
                            </div>
                          </div>
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
                className="btn bg-gray"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-dark">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
