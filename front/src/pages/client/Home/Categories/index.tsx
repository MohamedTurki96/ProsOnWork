import { Link } from 'react-router-dom';
import { Routes } from '../../../../router/routes/routes';
import { useCategories } from '../../../../hooks/useCategory';
import { useMemo } from 'react';

export function Categories() {
  const { data } = useCategories();

  const categories = useMemo(() => data?.data?.slice(0, 12), [data]);

  if (!categories) {
    return <></>;
  }

  return (
    <section className="section category-section aos" data-aos="fade-up">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center" data-aos="fade-up">
            <div className="section-header text-center">
              <h2 className="mb-1">
                Explorez <span className="text-primary">Les Catégories</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="row g-4 row-cols-xxl-6 row-cols-xl-6 row-cols-md-4 row-cols-sm-2 row-cols-1 justify-content-center">
          {categories?.map((category) => (
            <Link
              key={category.id}
              to={`${Routes.search}?categories=${category.id}`}
            >
              <div className="col d-flex">
                <div className="category-item text-center flex-fill">
                  <div className="mx-auto mb-3">
                    <img
                      src={category.icon?.filePath}
                      className="img-fluid"
                      alt="img"
                    />
                  </div>
                  <h6 className="fs-14 mb-1">{category.name}</h6>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="row">
          <div className="col-md-12 text-center view-all">
            <Link to={Routes.categories} className="btn btn-dark">
              Afficher Tous
              <i className="ti ti-arrow-right ms-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
