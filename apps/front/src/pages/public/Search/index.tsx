import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProductListWhereDTO } from '../../../api';
import { useFilteredServices } from '../../../hooks/useProducts';

import { ServiceCard } from './Card';
import { Filter } from './Filter';

function extractFilter(searchParams: URLSearchParams) {
  const data: ProductListWhereDTO = {};

  Array.from(searchParams).map(([key, value]) => {
    if (key == 'q' && searchParams.get(key)) {
      data.q = value!;
    }

    if (key == 'minPrice' && value) {
      data.minPrice = Number(value);
    }

    if (key == 'maxPrice' && value) {
      data.minPrice = Number(value);
    }

    if (key == 'latitude' && value) {
      data.latitude = Number(value);
    }

    if (key == 'longitude' && value) {
      data.longitude = Number(value);
    }

    if (key == 'rating') {
      if (!data.rating) {
        data.rating = [];
      }
      data.rating.push(Number(value));
    }

    if (key == 'categories') {
      if (!data.categories) {
        data.categories = [];
      }
      data.categories.push(Number(value));
    }
  });

  return data;
}

export function Search() {
  const [searchParams] = useSearchParams();
  const [where, setWhere] = useState<ProductListWhereDTO>(
    extractFilter(searchParams),
  );
  const { data: products, isLoading } = useFilteredServices(where);

  const onFilter = useCallback(async () => {
    setWhere(extractFilter(searchParams));
  }, [searchParams, setWhere]);

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
