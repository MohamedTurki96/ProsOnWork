import { Dropdown } from 'primereact/dropdown';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FaqDTO,
  PriceType,
  ProductCreateDTO,
  ProductType,
  ProductUpdateDTO,
} from '../../../api';
import { AppLoader } from '../../../components/AppLoader';
import { FileUpload } from '../../../components/FileUpload';
import { Img } from '../../../components/Img';
import { useConnectedUser } from '../../../hooks/useAuth';
import { useCategories } from '../../../hooks/useCategory';
import {
  useCreateProduct,
  useDeleteProduct,
  useFilteredServices,
  useUpdateProduct,
} from '../../../hooks/useProducts';
import { useShops } from '../../../hooks/useShop';

const DEFAULT = {
  categoryId: 0,
  description: '',
  isActive: true,
  name: '',
  price: 0,
  priceType: PriceType.Package,
  shopId: 0,
  type: ProductType.Service,
  faq: [],
  includes: [],
  medias: [],
};

export function Services() {
  const { data: user } = useConnectedUser();
  const { data: shops } = useShops(user?.id ? { ownerId: user.id } : {});
  const { data: categories } = useCategories();
  const { data: products } = useFilteredServices(
    user?.id ? { providerId: user.id } : {},
  );
  const [createData, setCreateData] = useState<ProductCreateDTO>(DEFAULT);
  const [updateData, setUpdateData] = useState<
    ProductUpdateDTO & { id: number }
  >({
    id: 0,
  });
  const closeRefCreate = useRef<HTMLAnchorElement>(null);
  const closeRefUpdate = useRef<HTMLAnchorElement>(null);
  const closeRefDelete = useRef<HTMLButtonElement>(null);

  const { mutate: create } = useCreateProduct(() => {
    closeRefCreate.current?.click();
  });

  const { mutate: update } = useUpdateProduct(() => {
    closeRefUpdate.current?.click();
  });

  const { mutate: deleteProduit } = useDeleteProduct(() => {
    closeRefDelete.current?.click();
  });

  const handleCreateChange = useCallback(
    (key: keyof ProductCreateDTO, value: any) => {
      setCreateData({
        ...createData,
        [key]: value,
      });
    },
    [setCreateData, createData],
  );

  const handleUpdateChange = useCallback(
    (key: keyof ProductUpdateDTO, value: any) => {
      setUpdateData({
        ...updateData,
        [key]: value,
      });
    },
    [setUpdateData, updateData],
  );

  if (!products || !shops || !user || !categories) {
    return <AppLoader />;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h5>Services</h5>
        <div className="d-flex align-items-center">
          <Link
            to="#"
            className="btn btn-dark d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#add-product"
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
                  <th>Description</th>
                  <th>Type</th>
                  <th>price</th>
                  <th>priceType</th>
                  <th>categorie</th>
                  <th>Shop</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.items.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.type}</td>
                      <td>{product.price}</td>
                      <td>{product.priceType}</td>
                      <td>
                        {categories.items.find(
                          (x) => x.id == product.categoryId,
                        )?.name ?? ''}
                      </td>
                      <td>
                        {shops.items.find((x) => x.id == product.shopId)
                          ?.name ?? ''}
                      </td>
                      <td>
                        <div className="user-icon d-inline-flex">
                          <Link
                            to="#"
                            className="me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-product"
                            onClick={() => setUpdateData(product)}
                          >
                            <i className="ti ti-edit" />
                          </Link>
                          <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target={`#del-product-${product.id}`}
                          >
                            <i className="ti ti-trash" />
                          </Link>
                          <div
                            className="modal fade"
                            id={`del-product-${product.id}`}
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
                                      <h4>Supprimer Service ?</h4>
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
                                      onClick={() => deleteProduit(product.id)}
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
        id="add-product"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Ajouter un service</h5>
              <Link
                to="#"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRefCreate}
                onClick={() => {
                  setCreateData(DEFAULT);
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
                            onChange={(e) =>
                              handleCreateChange('name', e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            onChange={(e) =>
                              handleCreateChange('description', e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Type</label>
                          <Dropdown
                            value={createData.type}
                            onChange={(e) =>
                              handleCreateChange('type', e.target.value)
                            }
                            options={[
                              ProductType.Equipment,
                              ProductType.Service,
                            ]}
                            placeholder="Type"
                            className="select w-100"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Price Type</label>
                          <Dropdown
                            value={createData.priceType}
                            onChange={(e) =>
                              handleCreateChange('priceType', e.target.value)
                            }
                            options={[PriceType.Hour, PriceType.Package]}
                            placeholder="Price Type"
                            className="select w-100"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Price</label>
                          <input
                            type="number"
                            className="form-control"
                            onChange={(e) =>
                              handleCreateChange('price', e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Categorie</label>
                          <Dropdown
                            value={createData.categoryId}
                            onChange={(e) =>
                              handleCreateChange('categoryId', e.target.value)
                            }
                            options={categories.items.map((s) => ({
                              id: s.id,
                              name: s.name,
                            }))}
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Categorie"
                            className="select w-100"
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
                          <label className="form-label">Includes</label>
                          <Includes
                            onChange={(data) =>
                              handleCreateChange('includes', data)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Faq</label>
                          <Faq
                            onChange={(data) => handleCreateChange('faq', data)}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Medias</label>
                          <Medias
                            onChange={(data) =>
                              handleCreateChange('medias', data)
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
        id="edit-product"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Modifier service</h5>
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
                            value={updateData.name}
                            onChange={(e) =>
                              handleUpdateChange('name', e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            value={updateData.description}
                            onChange={(e) =>
                              handleUpdateChange('description', e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Type</label>
                          <Dropdown
                            value={updateData.type}
                            onChange={(e) =>
                              handleUpdateChange('type', e.target.value)
                            }
                            options={[
                              ProductType.Equipment,
                              ProductType.Service,
                            ]}
                            placeholder="Type"
                            className="select w-100"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Price Type</label>
                          <Dropdown
                            value={updateData.priceType}
                            onChange={(e) =>
                              handleUpdateChange('priceType', e.target.value)
                            }
                            options={[PriceType.Hour, PriceType.Package]}
                            placeholder="Price Type"
                            className="select w-100"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Price</label>
                          <input
                            type="number"
                            value={updateData.price}
                            className="form-control"
                            onChange={(e) =>
                              handleUpdateChange('price', e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Categorie</label>
                          <Dropdown
                            value={updateData.categoryId}
                            onChange={(e) =>
                              handleUpdateChange('categoryId', e.target.value)
                            }
                            options={categories.items.map((s) => ({
                              id: s.id,
                              name: s.name,
                            }))}
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Categorie"
                            className="select w-100"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Includes</label>
                          <Includes
                            data={updateData.includes}
                            onChange={(data) =>
                              handleUpdateChange('includes', data)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Faq</label>
                          <Faq
                          data={updateData.faq}
                            onChange={(data) => handleUpdateChange('faq', data)}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Medias</label>
                          <Medias
                          data={updateData.medias}
                            onChange={(data) =>
                              handleUpdateChange('medias', data)
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

type IncludesProps = {
  data?: string[];
  onChange: (data: string[]) => any;
};

export function Includes({ onChange, data }: IncludesProps) {
  const [addList, setAddList] = useState<string[]>(data ?? ['']);

  const handelAdd = () => {
    setAddList([...addList, ' ']);
  };

  const handleUpdate = (index: any, value: string) => {
    const list = [...addList];
    list[index] = value;
    setAddList(list);
  };

  const handelRemove = (index: any) => {
    const list = [...addList];
    list.splice(index, 1);
    setAddList(list);
  };

  useEffect(() => {
    onChange(addList);
  }, [addList]);

  useEffect(() => {
    if (data) {
      setAddList(data);
    }
  }, [data, setAddList]);

  return (
    <div
      className="accordion-collapse collapse show"
      aria-labelledby="accordion-headingFour"
    >
      <div className="accordion-body p-0 mt-3 pb-1">
        <div className="addtitle-info">
          {addList.map((add: any, index: any) => (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      value={add}
                      onChange={(e) => handleUpdate(index, e.target.value)}
                    />
                    {addList.length > 1 ? (
                      <Link
                        to="#"
                        onClick={() => handelRemove(index)}
                        className="text-primary d-inline-flex align-items-center text-danger delete-item ms-4"
                      >
                        <i className="ti ti-trash"></i>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="#"
          onClick={handelAdd}
          className="text-primary d-inline-flex align-items-center add-extra fs-14 mb-3"
        >
          <i className="ti ti-circle-plus me-2" />
          Add New
        </Link>
      </div>
    </div>
  );
}

type FaqProps = {
  data?: FaqDTO[];
  onChange: (data: FaqDTO[]) => any;
};

const DEFAULT_FAQ = { answer: '', question: '' };

export function Faq({ onChange, data }: FaqProps) {
  const [addList, setAddList] = useState<FaqDTO[]>(data ?? [DEFAULT_FAQ]);

  const handelAdd = () => {
    setAddList([...addList, DEFAULT_FAQ]);
  };

  const handleUpdate = (index: any, value: FaqDTO) => {
    const list = [...addList];
    list[index] = value;
    setAddList(list);
  };

  const handelRemove = (index: any) => {
    const list = [...addList];
    list.splice(index, 1);
    setAddList(list);
  };

  useEffect(() => {
    onChange(addList);
  }, [addList]);

  useEffect(() => {
    if (data) {
      setAddList(data);
    }
  }, [data, setAddList]);

  return (
    <div
      className="accordion-collapse collapse show"
      aria-labelledby="accordion-headingFour"
    >
      <div className="accordion-body p-0 mt-3 pb-1">
        <div className="addtitle-info">
          {addList.map((add: FaqDTO, index: any) => (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="mb-3">
                  <div>
                    <div>
                      <label>Question</label>
                      <input
                        type="text"
                        className="form-control"
                        value={add.question}
                        onChange={(e) =>
                          handleUpdate(index, {
                            ...add,
                            question: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>Reponse</label>
                      <input
                        type="text"
                        className="form-control"
                        value={add.answer}
                        onChange={(e) =>
                          handleUpdate(index, {
                            ...add,
                            answer: e.target.value,
                          })
                        }
                      />
                    </div>
                    {addList.length > 1 ? (
                      <Link
                        to="#"
                        onClick={() => handelRemove(index)}
                        className="text-primary d-inline-flex align-items-center text-danger delete-item ms-4"
                      >
                        <i className="ti ti-trash"></i>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="#"
          onClick={handelAdd}
          className="text-primary d-inline-flex align-items-center add-extra fs-14 mb-3"
        >
          <i className="ti ti-circle-plus me-2" />
          Add New
        </Link>
      </div>
    </div>
  );
}

type MediasProps = {
  data?: number[];
  onChange: (data: number[]) => any;
};

export function Medias({ onChange, data }: MediasProps) {
  const [addList, setAddList] = useState<number[]>(data ?? [0]);

  const handelAdd = () => {
    setAddList([...addList, 0]);
  };

  const handleUpdate = (index: any, value: number) => {
    const list = [...addList];
    list[index] = value;
    setAddList(list);
  };

  const handelRemove = (index: any) => {
    const list = [...addList];
    list.splice(index, 1);
    setAddList(list);
  };

  useEffect(() => {
    onChange(addList);
  }, [addList]);

  useEffect(() => {
    if (data) {
      setAddList(data);
    }
  }, [data, setAddList]);

  return (
    <div
      className="accordion-collapse collapse show"
      aria-labelledby="accordion-headingFour"
    >
      <div className="accordion-body p-0 mt-3 pb-1">
        <div className="addtitle-info">
          {addList.map((add: any, index: any) => (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    {!!add && (
                      <Img
                        mediaId={add}
                        className="img-thumbnail mx-2"
                        style={{
                          width: 120,
                          height: 80,
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    <FileUpload
                      pictureOnly
                      onFileUploaded={async (media) =>
                        handleUpdate(index, media.id)
                      }
                    />
                    {addList.length > 1 ? (
                      <Link
                        to="#"
                        onClick={() => handelRemove(index)}
                        className="text-primary d-inline-flex align-items-center text-danger delete-item ms-4"
                      >
                        <i className="ti ti-trash"></i>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="#"
          onClick={handelAdd}
          className="text-primary d-inline-flex align-items-center add-extra fs-14 mb-3"
        >
          <i className="ti ti-circle-plus me-2" />
          Add New
        </Link>
      </div>
    </div>
  );
}
