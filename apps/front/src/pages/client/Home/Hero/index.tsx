import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GeoLocationMap } from '../../../../components/GeoLocation';
import { TypingEffect } from '../../../../components/TypingEffect/inedx';
import { Routes } from '../../../../router/routes/routes';
import { GeoLocation } from '../../../../utils/getGeolocationText';

export function Hero() {
  const [show, setShow] = useState(false);
  const [geoLocation, setGeoLocation] = useState<GeoLocation | null>(null);
  const [keywords, setKeyWords] = useState('');
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    navigate(
      `${Routes.search}?${
        keywords.length ? `q=${encodeURIComponent(keywords)}` : ''
      }${
        geoLocation
          ? `&longitude=${encodeURIComponent(geoLocation!.longitude)}&latitude=${encodeURIComponent(geoLocation!.latitude)}`
          : ''
      }`,
    );
  }, [geoLocation, keywords]);

  return (
    <section className="hero-section">
      <div className="bg-wave d-none d-md-block">
        <img src="assets/img/bg/bg-wave.png" className="img-fluid" alt="bg" />
      </div>
      <div className="corner-large d-none d-md-block">
        <img
          src="assets/img/bg/corner-large.png"
          className="img-fluid"
          alt="bg"
        />
      </div>
      <div className="corner-small d-none d-md-block">
        <img
          src="assets/img/bg/corner-small.png"
          className="img-fluid"
          alt="bg"
        />
      </div>
      <div className="container">
        <div className="home-banner">
          <div className="row align-items-center w-100">
            <div className="col-lg-7 col-md-10 mx-auto">
              <div className="section-search aos" data-aos="fade-up">
                <h1 className="mb-5">
                  Connectez-vous avec les meilleurs
                  <TypingEffect
                    className="ms-2"
                    words={[
                      'Plombiers',
                      'Électriciens',
                      'Déménageurs',
                      'Livreurs',
                      'Nettoyeurs',
                      'Menuisiers',
                      'Coiffeurs',
                      'Bâtisseurs',
                    ]}
                  />
                </h1>
                <div className="search-box mt-5">
                  <div>
                    <div className="search-input line">
                      <div className="search-group-icon">
                        <i className="feather icon-map-pin"></i>
                      </div>
                      <div className="form-group mb-0">
                        <label>Votre Localisation</label>
                        <span
                          onClick={() => setShow(true)}
                          className="link-primary text-decoration-underline fs-14"
                          style={{ cursor: 'pointer' }}
                        >
                          Selectionner
                        </span>
                        <GeoLocationMap
                          onHide={() => setShow(false)}
                          show={show}
                          handleSave={setGeoLocation}
                        />
                      </div>
                    </div>
                    <div className="search-input">
                      <div className="search-group-icon search-icon">
                        <i className="feather icon-search"></i>
                      </div>
                      <div className="form-group mb-0">
                        <label>Que recherchez-vous ?</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Réparation automobile"
                          value={keywords}
                          onChange={(e) => setKeyWords(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="search-btn">
                      <button
                        className="btn btn-primary btn-lg"
                        type="button"
                        onClick={handleSearch}
                      >
                        Afficher
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-wrap banner-info">
                  <div className="d-flex align-items-center me-4">
                    <img src="assets/img/icons/success-01.svg" alt="icon" />
                    <div className="ms-2">
                      <h6>5,000 +</h6>
                      <p>Prestataire Vérifiés</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center me-4">
                    <img src="assets/img/icons/success-02.svg" alt="icon" />
                    <div className="ms-2">
                      <h6>12,000+</h6>
                      <p>Services Complétés</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center me-4">
                    <img src="assets/img/icons/success-03.svg" alt="icon" />
                    <div className="ms-2">
                      <h6>180,968</h6>
                      <p>Avis Globaux</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="banner-imgs">
                <div className="banner-1 shape-1">
                  <img
                    className="img-fluid"
                    alt="banner"
                    src="assets/img/services/banner1.png"
                  />
                </div>
                <div className="banner-2 shape-3">
                  <img
                    className="img-fluid"
                    alt="banner"
                    src="assets/img/services/banner2.png"
                  />
                </div>
                <div className="banner-3 shape-3">
                  <img
                    className="img-fluid"
                    alt="banner"
                    src="assets/img/services/banner3.png"
                  />
                </div>
                <div className="banner-4 shape-2">
                  <img
                    className="img-responsive"
                    alt="banner"
                    src="assets/img/services/banner4.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
