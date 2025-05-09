import { useCallback } from 'react';

import { useFilteredServices } from '../../../hooks/useProducts';

import { ServiceCard } from './Card';
import { Filter } from './Filter';

export function Search() {
  const { data: products, refetch, isLoading } = useFilteredServices();

  const onFilter = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
              <Filter onFilter={onFilter} />
            </div>
            <div className="col-xl-9 col-lg-8">
              {isLoading ? (
                <span className="loader">
                  <span className="loader-inner"></span>
                </span>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                    <h4>
                      <span className="text-primary me-1">
                        {products?.items?.length ?? 0} Services
                      </span>
                      Trouvés
                    </h4>
                  </div>
                  <div className="row justify-content-center align-items-center">
                    {products?.items.map((product, index) => (
                      <ServiceCard key={index} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
