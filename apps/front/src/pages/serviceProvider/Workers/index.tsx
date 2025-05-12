import { Dropdown } from 'primereact/dropdown';
import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { WorkerCreateDTO, WorkerUpdateDTO } from '../../../api';
import { AppLoader } from '../../../components/AppLoader';
import { useConnectedUser } from '../../../hooks/useAuth';
import { useShops } from '../../../hooks/useShop';
import {
  useCreateWorker,
  useDeleteWorker,
  useUpdateWorker,
  useWorkers,
} from '../../../hooks/useWorker';

export function Workers() {
  const { data: user } = useConnectedUser();

  const { data: workers } = useWorkers(user?.id ? { ownerId: user.id } : {});
  const { data: shops } = useShops(user?.id ? { ownerId: user.id } : {});

  const [createData, setCreateData] = useState<WorkerCreateDTO>({
    shopId: 0,
    name: '',
  });
  const [updateData, setUpdateData] = useState<
    WorkerUpdateDTO & { id: number }
  >({
    id: 0,
    name: '',
  });
  const closeRefCreate = useRef<HTMLAnchorElement>(null);
  const closeRefUpdate = useRef<HTMLAnchorElement>(null);
  const closeRefDelete = useRef<HTMLButtonElement>(null);

  const { mutate: create } = useCreateWorker(() => {
    closeRefCreate.current?.click();
  });

  const { mutate: update } = useUpdateWorker(() => {
    closeRefUpdate.current?.click();
  });

  const { mutate: deleteWorker } = useDeleteWorker(() => {
    closeRefDelete.current?.click();
  });

  const handleCreateChange = useCallback(
    (key: keyof WorkerCreateDTO, value: any) => {
      setCreateData({
        ...createData,
        [key]: value,
      });
    },
    [setCreateData, createData],
  );

  const handleUpdateChange = useCallback(
    (key: keyof WorkerUpdateDTO, value: any) => {
      setUpdateData({
        ...updateData,
        [key]: value,
      });
    },
    [setUpdateData, updateData],
  );

  if (!workers || !shops) {
    return <AppLoader />;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h5>Workers</h5>
        <div className="d-flex align-items-center">
          <Link
            to="#"
            className="btn btn-dark d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#add-worker"
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
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {workers.items.map((worker) => {
                  return (
                    <tr key={worker.id}>
                      <td>{worker.name}</td>
                      <td>{worker.phone}</td>
                      <td>
                        <div className="user-icon d-inline-flex">
                          <Link
                            to="#"
                            className="me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-worker"
                            onClick={() => setUpdateData(worker)}
                          >
                            <i className="ti ti-edit" />
                          </Link>
                          <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target={`#del-worker-${worker.id}`}
                          >
                            <i className="ti ti-trash" />
                          </Link>
                          <div
                            className="modal fade"
                            id={`del-worker-${worker.id}`}
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <button
                                  ref={closeRefDelete}
                                  type="button"
                                  className="d-none"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                                <div className="modal-body pt-0">
                                  <div className="text-center">
                                    <div className="mt-4">
                                      <h4>Supprimer worker ?</h4>
                                      <p className="text-muted mb-0">
                                        Êtes-vous sûr de vouloir supprimer ceci
                                        ?
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-2 justify-content-center mt-4">
                                    <button
                                      type="button"
                                      className="btn w-sm btn-danger"
                                      onClick={() => deleteWorker(worker.id)}
                                    >
                                      <i className="ti ti-trash" /> Oui
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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

      <div
        className="modal fade custom-modal"
        id="add-worker"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Ajouter un worker</h5>
              <Link
                to="#"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRefCreate}
                onClick={() =>
                  setCreateData({
                    name: '',
                    shopId: 0,
                  })
                }
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
                          <label className="form-label">Nom</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={(e) =>
                              handleCreateChange('name', e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Shop</label>
                          <Dropdown
                            value={createData.shopId}
                            onChange={(e) =>
                              handleCreateChange('shopId', e.target.value)
                            }
                            options={shops.items.map((s) => ({
                              id: s.id,
                              name: s.name,
                            }))}
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Shop"
                            className="select w-100"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            onChange={(e) =>
                              handleCreateChange('phone', e.target.value)
                            }
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
                onClick={() => create(createData)}
                disabled={!createData.name && !createData.shopId}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade custom-modal"
        id="edit-worker"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Modifier worker</h5>
              <Link
                to="#"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRefUpdate}
                onClick={() =>
                  setUpdateData({
                    id: 0,
                    name: '',
                  })
                }
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
                          <label className="form-label">Nom</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={updateData.name}
                            onChange={(e) =>
                              handleUpdateChange('name', e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Shop</label>
                          <Dropdown
                            value={updateData.shopId}
                            onChange={(e) =>
                              handleUpdateChange('shopId', e.target.value)
                            }
                            options={shops.items.map((s) => ({
                              id: s.id,
                              name: s.name,
                            }))}
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Shop"
                            className="select w-100"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={updateData.phone ?? ''}
                            onChange={(e) =>
                              handleUpdateChange('phone', e.target.value)
                            }
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
                onClick={() => update(updateData)}
                disabled={!updateData.name && !updateData.shopId}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
