import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { CategoryCreateDTO, CategoryUpdateDTO } from '../../../api';
import { AppLoader } from '../../../components/AppLoader';
import { FileUpload } from '../../../components/FileUpload';
import { Img } from '../../../components/Img';
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '../../../hooks/useCategory';

export function Categories() {
  const { data: categories } = useCategories();
  const [createData, setCreateData] = useState<CategoryCreateDTO>({
    name: '',
  });
  const [updateData, setUpdateData] = useState<
    CategoryUpdateDTO & { id: number }
  >({
    id: 0,
    name: '',
  });
  const closeRefCreate = useRef<HTMLAnchorElement>(null);
  const closeRefUpdate = useRef<HTMLAnchorElement>(null);
  const closeRefDelete = useRef<HTMLButtonElement>(null);

  const { mutate: create } = useCreateCategory(() => {
    closeRefCreate.current?.click();
  });

  const { mutate: update } = useUpdateCategory(() => {
    closeRefUpdate.current?.click();
  });

  const { mutate: deleteCategory } = useDeleteCategory(() => {
    closeRefDelete.current?.click();
  });

  const handleCreateChange = useCallback(
    (key: keyof CategoryCreateDTO, value: any) => {
      setCreateData({
        ...createData,
        [key]: value,
      });
    },
    [setCreateData, createData],
  );

  const handleUpdateChange = useCallback(
    (key: keyof CategoryUpdateDTO, value: any) => {
      setUpdateData({
        ...updateData,
        [key]: value,
      });
    },
    [setUpdateData, updateData],
  );

  if (!categories) {
    return <AppLoader />;
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
            data-bs-target="#add-category"
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
                            data-bs-target="#edit-category"
                            onClick={() => setUpdateData(category)}
                          >
                            <i className="ti ti-edit" />
                          </Link>
                          <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target={`#del-category-${category.id}`}
                          >
                            <i className="ti ti-trash" />
                          </Link>
                          <div
                            className="modal fade"
                            id={`del-category-${category.id}`}
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
                                      <h4>Supprimer catégorie ?</h4>
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
                                      onClick={() =>
                                        deleteCategory(category.id)
                                      }
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
        id="add-category"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Ajouter une catégorie</h5>
              <Link
                to="#"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRefCreate}
                onClick={() =>
                  setCreateData({
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
                            onChange={(e) =>
                              handleCreateChange('name', e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label  me-2">Icon</label>
                          <Img
                            mediaId={createData.iconId}
                            className="img-thumbnail mx-2"
                            style={{
                              width: 120,
                              height: 80,
                              objectFit: 'cover',
                            }}
                          />
                          <FileUpload
                            pictureOnly
                            onFileUploaded={async (media) =>
                              handleCreateChange('iconId', media.id)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label me-2">Image</label>
                          <Img
                            mediaId={createData.imageId}
                            className="img-thumbnail mx-2"
                            style={{
                              width: 120,
                              height: 80,
                              objectFit: 'cover',
                            }}
                          />
                          <FileUpload
                            pictureOnly
                            onFileUploaded={async (media) =>
                              handleCreateChange('imageId', media.id)
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
        id="edit-category"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Modifier catégorie</h5>
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
                          <label className="form-label  me-2">Icon</label>
                          <Img
                            mediaId={updateData.iconId}
                            className="img-thumbnail mx-2"
                            style={{
                              width: 120,
                              height: 80,
                              objectFit: 'cover',
                            }}
                          />
                          <FileUpload
                            pictureOnly
                            onFileUploaded={async (media) =>
                              handleUpdateChange('iconId', media.id)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label me-2">Image</label>
                          <Img
                            mediaId={updateData.imageId}
                            className="img-thumbnail mx-2"
                            style={{
                              width: 120,
                              height: 80,
                              objectFit: 'cover',
                            }}
                          />
                          <FileUpload
                            pictureOnly
                            onFileUploaded={async (media) =>
                              handleUpdateChange('imageId', media.id)
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
