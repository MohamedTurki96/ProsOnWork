export function Work() {
  return (
    <section className="work-section-two aos" data-aos="fade-up">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center" data-aos="fade-up">
            <div className="section-header text-center">
              <h2 className="mb-1">
                Comment <span className="text-primary">Ça Marche</span>
              </h2>
            </div>
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ marginLeft: '5.8rem' }}
        >
          <div className="col-lg-4 col-md-6">
            <div className="work-wrap-box work-first aos" data-aos="fade-up">
              <div className="work-icon">
                <span>
                  <img src="assets/img/icons/work-icon-03.svg" alt="img" />
                </span>
              </div>
              <h5>Définissez Votre Localisation</h5>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="work-wrap-box work-last aos" data-aos="fade-up">
              <div className="work-icon">
                <span>
                  <img src="assets/img/icons/work-icon-02.svg" alt="img" />
                </span>
              </div>
              <h5>Trouvez Ce Que Vous Voulez</h5>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="work-wrap-box aos" data-aos="fade-up">
              <div className="work-flex">
                <div className="work-icon">
                  <span>
                    <img src="assets/img/icons/work-icon-01.svg" alt="img" />
                  </span>
                </div>
                <h5>Réservez Votre Service</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
