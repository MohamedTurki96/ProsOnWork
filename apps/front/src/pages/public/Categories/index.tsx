import { Link } from 'react-router-dom';

import { Img } from '../../../components/Img';
import { useCategories } from '../../../hooks/useCategory';
import { Routes } from '../../../router/routes/routes';

export function Categories() {
  const { data: categories } = useCategories();

  if (!categories?.items) {
    return <></>;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            {categories.items.map((category) => (
              <div key={category.id} className="col-lg-3 col-md-6">
                <Link to={`${Routes.search}?categories=${category.id}`}>
                  <div
                    className="category card wow fadeInUp"
                    data-wow-delay="0.3s"
                  >
                    <div className="card-body">
                      <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                        <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                          <Img
                            mediaId={category.iconId}
                            className="img-fluid"
                            alt="img"
                          />
                        </span>
                      </div>
                      <h5 className="text-center">{category.name}</h5>
                      <div className="overlay">
                        <Img
                          mediaId={category.imageId}
                          className="img-fluid"
                          alt="img"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
