import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Slider, SliderSingleProps } from 'antd';
import StickyBox from 'react-sticky-box';
import { useCategories } from '../../../../hooks/useCategory';
import { GeoLocationMap } from '../../../../components/GeoLocation';
import { renderPrice } from '../../../../utils/renderPrice';

interface FilterProps {
  onFilter: () => void;
}

export function Filter({ onFilter }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const latitude = (searchParams.get('latitude') ?? null) as number | null;
  const longitude = (searchParams.get('longitude') ?? null) as number | null;
  const keywords = searchParams.get('q') ?? '';
  const selectedCategories = (searchParams.getAll('categories') ?? []).map(
    (x) => parseInt(x),
  );
  const minPrice = parseInt(searchParams.get('minPrice')! ?? 0);
  const maxPrice = parseInt(searchParams.get('maxPrice')! ?? 1000);
  const rating = (searchParams.getAll('rating') ?? []).map((x) => parseInt(x));

  const updateQueryParam = (key: string, value: any) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
  };

  const updatePriceQueryParam = (values: number[]) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('minPrice', values[0] as unknown as string);
    newSearchParams.set('maxPrice', values[1] as unknown as string);
    setSearchParams(newSearchParams);
  };

  const updateQueryParamList = (key: string, values: any[]) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(key);
    values.map((x) => newSearchParams.append(key, x));
    setSearchParams(newSearchParams);
  };

  const handleCategoriesCheck = (categoryId: number, checked: boolean) => {
    let newCategories: number[] = [];

    if (!checked) {
      newCategories = selectedCategories.filter((x) => x != categoryId);
    } else {
      newCategories = Array.from(new Set(selectedCategories).add(categoryId));
    }
    updateQueryParamList('categories', newCategories);
  };

  const handleRatingCheck = (rate: number, checked: boolean) => {
    let newRating: number[] = [];

    if (!checked) {
      newRating = rating.filter((x) => x != rate);
    } else {
      newRating = Array.from(new Set(rating).add(rate));
    }
    updateQueryParamList('rating', newRating);
  };

  const [showLocation, setShowLocation] = useState(false);
  const [location, setLocation] = useState('');

  const [isExpanded, setIsExpanded] = useState(false);
  const filterCheckboxStyle = {
    height: isExpanded ? 'auto' : '150px',
  };
  const { data: categories } = useCategories();
  const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (
    value,
  ) => renderPrice(value!);

  return (
    <StickyBox>
      <div className="card ">
        <div className="card-body">
          <form>
            <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
              <h5>
                <i className="ti ti-filter-check me-2" />
                Filtres
              </h5>
            </div>
            <div className="mb-3 pb-3 border-bottom">
              <input
                type="text"
                className="form-control"
                placeholder="Que cherchez-vous?"
                defaultValue={keywords}
                onBlur={(e) => updateQueryParam('q', e.target.value)}
              />
            </div>
            <div className="accordion border-bottom mb-3">
              <div className="accordion-item mb-3">
                <div className="accordion-header" id="accordion-headingThree">
                  <div
                    className="accordion-button p-0 mb-3"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordion-collapseThree"
                    aria-expanded="true"
                    aria-controls="accordion-collapseThree"
                    role="button"
                  >
                    Catégories
                  </div>
                </div>
                <div
                  id="accordion-collapseThree"
                  className="accordion-collapse collapse show"
                  aria-labelledby="accordion-headingThree"
                >
                  <div
                    className="content-list mb-3"
                    id="fill-more"
                    style={filterCheckboxStyle}
                  >
                    {categories?.data &&
                      categories.data.map((category) => (
                        <div className="form-check mb-2" key={category.id}>
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedCategories.includes(
                                category.id!,
                              )}
                              onChange={(e) =>
                                handleCategoriesCheck(
                                  category.id!,
                                  e.target.checked,
                                )
                              }
                            />
                            {category.name}
                          </label>
                        </div>
                      ))}
                  </div>
                  <span
                    id="more"
                    className="more-view text-primary fs-14 text-und text-decoration-underline"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? (
                      <>
                        Voir moins
                        <i className="ti ti-chevron-up ms-1" />
                      </>
                    ) : (
                      <>
                        Voir plus
                        <i className="ti ti-chevron-down ms-1" />
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="accordion border-bottom mb-3">
              <div className="accordion-header" id="accordion-headingFive">
                <div
                  className="accordion-button p-0 mb-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion-collapseFive"
                  aria-expanded="true"
                  aria-controls="accordion-collapseFive"
                  role="button"
                >
                  Localisation
                </div>
              </div>
              <div
                id="accordion-collapseFive"
                className="accordion-collapse collapse show"
                aria-labelledby="accordion-headingFive"
              >
                <div className="mb-3">
                  <div className="position-relative">
                    <div className="mb-1">{location}</div>
                    <span
                      onClick={() => setShowLocation(true)}
                      className="link-primary text-decoration-underline fs-14"
                      style={{ cursor: 'pointer' }}
                    >
                      Selectionner
                    </span>
                    <GeoLocationMap
                      show={showLocation}
                      onHide={() => setShowLocation(false)}
                      handleSave={(geolocation, text) => {
                        setLocation(text);
                        if (geolocation) {
                          if (geolocation.longitude != longitude)
                            updateQueryParam(
                              'longitude',
                              geolocation.longitude,
                            );
                          if (geolocation.latitude != latitude)
                            updateQueryParam('latitude', geolocation.latitude);
                        }
                      }}
                      geoLocation={
                        longitude !== null && latitude !== null
                          ? { longitude, latitude }
                          : null
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion border-bottom mb-3">
              <div className="accordion-header" id="accordion-headingSix">
                <div
                  className="accordion-button p-0 mb-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion-collapseSix"
                  aria-expanded="true"
                  aria-controls="accordion-collapseSix"
                  role="button"
                >
                  Gamme de prix
                </div>
              </div>
              <div
                id="accordion-collapseSix"
                className="accordion-collapse collapse show"
                aria-labelledby="accordion-headingSix"
              >
                <div className="filter-range">
                  <Slider
                    range
                    tooltip={{ formatter }}
                    step={10}
                    min={0}
                    max={1000}
                    value={[minPrice, maxPrice]}
                    onChange={updatePriceQueryParam}
                  />
                </div>
                <div className="filter-range-amount mb-3">
                  <p className="fs-14">
                    Prix:
                    <span>
                      {minPrice} - {maxPrice} TND
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion">
              <div className="accordion-item mb-3">
                <div className="accordion-header" id="accordion-headingTwo">
                  <div
                    className="accordion-button fs-18 p-0 mb-3"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordion-collapseTwo"
                    aria-expanded="true"
                    aria-controls="accordion-collapseTwo"
                    role="button"
                  >
                    Notes
                  </div>
                </div>
                <div
                  id="accordion-collapseTwo"
                  className="accordion-collapse collapse show"
                  aria-labelledby="accordion-headingTwo"
                >
                  <div className="mb-3">
                    <div className="form-check mb-2">
                      <label className="form-check-label d-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={rating.includes(5)}
                          onChange={(e) =>
                            handleRatingCheck(5, e.target.checked)
                          }
                        />
                        <span className="rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                        </span>
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <label className="form-check-label d-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={rating.includes(4)}
                          onChange={(e) =>
                            handleRatingCheck(4, e.target.checked)
                          }
                        />
                        <span className="rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fa-regular fa-star filled" />
                        </span>
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <label className="form-check-label d-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={rating.includes(3)}
                          onChange={(e) =>
                            handleRatingCheck(3, e.target.checked)
                          }
                        />
                        <span className="rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fa-regular fa-star filled" />
                          <i className="fa-regular fa-star filled" />
                        </span>
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <label className="form-check-label d-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={rating.includes(2)}
                          onChange={(e) =>
                            handleRatingCheck(2, e.target.checked)
                          }
                        />
                        <span className="rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fa-regular fa-star filled" />
                          <i className="fa-regular fa-star filled" />
                          <i className="fa-regular fa-star filled" />
                        </span>
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <label className="form-check-label d-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={rating.includes(1)}
                          onChange={(e) =>
                            handleRatingCheck(1, e.target.checked)
                          }
                        />
                        <span className="rating">
                          <i className="fas fa-star filled" />
                          <i className="fa-regular fa-star filled" />
                          <i className="fa-regular fa-star filled" />
                          <i className="fa-regular fa-star filled" />
                          <i className="fa-regular fa-star filled" />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn btn-dark w-100" onClick={onFilter}>
              Recherche
            </div>
          </form>
        </div>
      </div>
    </StickyBox>
  );
}
