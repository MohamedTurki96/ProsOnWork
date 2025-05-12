import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { ShopCreateDTO, ShopUpdateDTO } from '../../../api';
import { AppLoader } from '../../../components/AppLoader';
import { GeoLocationMap } from '../../../components/GeoLocation';
import { useConnectedUser } from '../../../hooks/useAuth';
import {
  useCreateShop,
  useDeleteShop,
  useShops,
  useUpdateShop,
} from '../../../hooks/useShop';
import {
  addressToString,
  stringToAddress,
} from '../../../utils/getGeolocationText';

export function Shops() {
  const { data: user } = useConnectedUser();
  const { data: shops } = useShops(user?.id ? { ownerId: user.id } : {});
  const [createData, setCreateData] = useState<ShopCreateDTO>({
    ownerId: 0,
    name: '',
  });
  const [updateData, setUpdateData] = useState<ShopUpdateDTO & { id: number }>({
    id: 0,
    name: '',
  });
  const [showCreateLocation, setShowCreateLocation] = useState(false);
  const [showUpdateLocation, setShowUpdateLocation] = useState(false);
  const [createLocation, setCreateLocation] = useState('');
  const [updateLocation, setUpdateLocation] = useState('');
  const closeRefCreate = useRef<HTMLAnchorElement>(null);
  const closeRefUpdate = useRef<HTMLAnchorElement>(null);
  const closeRefDelete = useRef<HTMLButtonElement>(null);

  const { mutate: create } = useCreateShop(() => {
    closeRefCreate.current?.click();
  });

  const { mutate: update } = useUpdateShop(() => {
    closeRefUpdate.current?.click();
  });

  const { mutate: deleteCategory } = useDeleteShop(() => {
    closeRefDelete.current?.click();
  });

  const handleCreateChange = useCallback(
    (key: keyof ShopCreateDTO, value: any) => {
      setCreateData({
        ...createData,
        [key]: value,
      });
    },
    [setCreateData, createData],
  );

  const handleUpdateChange = useCallback(
    (key: keyof ShopUpdateDTO, value: any) => {
      setUpdateData({
        ...updateData,
        [key]: value,
      });
    },
    [setUpdateData, updateData],
  );

  useEffect(() => {
    if (user) {
      setCreateData({
        ownerId: user.id,
        name: '',
      });
    }
  }, [user, setCreateData]);

  if (!shops || !user) {
    return <AppLoader />;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h5>Shops</h5>
        <div className="d-flex align-items-center">
          <Link
            to="#"
            className="btn btn-dark d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#add-shop"
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {shops.items.map((shop) => {
                  return (
                    <tr key={shop.id}>
                      <td>{shop.name}</td>
                      <td>
                        <div className="user-icon d-inline-flex">
                          <Link
                            to="#"
                            className="me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-shop"
                            onClick={() => setUpdateData(shop)}
                          >
                            <i className="ti ti-edit" />
                          </Link>
                          <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target={`#del-shop-${shop.id}`}
                          >
                            <i className="ti ti-trash" />
                          </Link>
                          <div
                            className="modal fade"
                            id={`del-shop-${shop.id}`}
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
                                      <h4>Supprimer shop ?</h4>
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
                                      onClick={() => deleteCategory(shop.id)}
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
        id="add-shop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Ajouter un shop</h5>
              <Link
                to="#"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRefCreate}
                onClick={() => {
                  setCreateData({
                    ownerId: user.id,
                    name: '',
                  });
                  setCreateLocation('');
                }}
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
                            value={createData.name}
                            onChange={(e) =>
                              handleCreateChange('name', e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          {createLocation && <p>{createLocation}</p>}
                          <span
                            onClick={() => setShowCreateLocation(true)}
                            className="link-primary text-decoration-underline fs-14"
                            style={{ cursor: 'pointer' }}
                          >
                            Selectionner
                          </span>
                          <GeoLocationMap
                            show={showCreateLocation}
                            onHide={() => setShowCreateLocation(false)}
                            handleSave={(geolocation, text) => {
                              if (geolocation) {
                                setCreateLocation(text);
                                handleCreateChange(
                                  'address',
                                  addressToString(geolocation),
                                );
                              }
                            }}
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
                disabled={!!!createData.name}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade custom-modal"
        id="edit-shop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Modifier shop</h5>
              <Link
                to="#"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRefUpdate}
                onClick={() => {
                  setUpdateData({
                    id: 0,
                    name: '',
                  });
                  setUpdateLocation('');
                }}
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
                          <label className="form-label">Address</label>
                          {updateLocation && <p>{updateLocation}</p>}
                          <span
                            onClick={() => setShowUpdateLocation(true)}
                            className="link-primary text-decoration-underline fs-14"
                            style={{ cursor: 'pointer' }}
                          >
                            Selectionner
                          </span>
                          <GeoLocationMap
                            show={showUpdateLocation}
                            onHide={() => setShowUpdateLocation(false)}
                            handleSave={(geolocation, text) => {
                              if (geolocation) {
                                setUpdateLocation(text);
                                handleUpdateChange(
                                  'address',
                                  addressToString(geolocation),
                                );
                              }
                            }}
                            geoLocation={
                              updateData.address
                                ? stringToAddress(updateData.address)
                                : null
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
                disabled={!!!updateData.name}
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
