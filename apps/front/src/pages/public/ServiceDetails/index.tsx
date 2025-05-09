import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import StickyBox from 'react-sticky-box';
import Lightbox from 'yet-another-react-lightbox';

import { UserRole } from '../../../api';
import { AppLoader } from '../../../components/AppLoader';
import VideoModal from '../../../core/hooks/video-modal';
import { useGranted } from '../../../hooks/useGranted';
import { useProduct } from '../../../hooks/useProducts';
import { Routes } from '../../../router/routes/routes';
import 'yet-another-react-lightbox/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getGeolocationText } from '../../../utils/getGeolocationText';
import { renderDate } from '../../../utils/renderDate';
import { renderPrice } from '../../../utils/renderPrice';

export function ServiceDetails() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id!);
  const { data: product, isLoading } = useProduct(id);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const show = useGranted([UserRole.CLIENT], true);
  const [addressText, setAddressText] = useState('');

  const [showModal, setShowModal] = useState(false);
  const videoUrl = 'https://www.youtube.com/watch?v=Vdp6x7Bibtk';
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [open, setOpen] = React.useState(false);

  const two = {
    dots: false,
    autoplay: false,
    slidesToShow: 6,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const settings1 = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2 || undefined, // Link to the second slider
    ref: (slider: any) => (sliderRef1.current = slider), // Assign the slider ref
  };

  const settings2 = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: nav1 || undefined, // Link to the first slider
    ref: (slider: any) => (sliderRef2.current = slider), // Assign the slider ref
  };
  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  useEffect(() => {
    (async function () {
      setAddressText(await getGeolocationText(product?.address));
    })();
  }, [setAddressText, product]);

  if (!product || isLoading) {
    return <AppLoader />;
  }
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-xl-8">
                <div className="card border-0">
                  <div className="card-body">
                    <div className="service-head mb-2">
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <h3 className="mb-2">{product.name}</h3>
                        <span className="badge badge-purple-transparent mb-2">
                          <i className="ti ti-calendar-check me-1" />
                          6000+ Bookings
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                        <div className="d-flex align-items-center flex-wrap">
                          {addressText && (
                            <p className="me-3 mb-2">
                              <i className="ti ti-map-pin me-2" />
                              {addressText}
                              <Link
                                to="#"
                                className="link-primary text-decoration-underline ms-1"
                              >
                                View Location
                              </Link>
                            </p>
                          )}
                          <p className="mb-2">
                            <i className="ti ti-star-filled text-warning me-2" />
                            <span className="text-gray-9">4.9</span>(255
                            reviews)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="service-wrap mb-4">
                      <div className="slider-wrap">
                        <Slider
                          {...settings1}
                          className="owl-carousel reactslick service-carousel nav-center mb-3"
                        >
                          <div className="service-img">
                            <img
                              src="/assets/img/services/service-slider-01.jpg"
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                          <div className="service-img">
                            <img
                              src="/assets/img/services/service-slider-02.jpg"
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                          <div className="service-img">
                            <img
                              src="/assets/img/services/service-slider-03.jpg"
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                          <div className="service-img">
                            <img
                              src="/assets/img/services/service-slider-04.jpg"
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                          <div className="service-img">
                            <img
                              src="/assets/img/services/service-slider-05.jpg"
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                          <div className="service-img">
                            <img
                              src="/assets/img/services/service-slider-06.jpg"
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                        </Slider>
                        <Link
                          to="#"
                          onClick={() => setOpen(true)}
                          className="btn btn-white btn-sm view-btn"
                        >
                          <i className="feather icon-image me-1" />
                          View all
                        </Link>
                      </div>
                      <Slider
                        {...settings2}
                        className="owl-carousel slider-nav-thumbnails reactslick nav-center"
                      >
                        <div>
                          <img
                            src="/assets/img/services/service-thumb-01.jpg"
                            className="img-fluid"
                            alt="Slider Img"
                          />
                        </div>
                        <div>
                          <img
                            src="/assets/img/services/service-thumb-02.jpg"
                            className="img-fluid"
                            alt="Slider Img"
                          />
                        </div>
                        <div>
                          <img
                            src="/assets/img/services/service-thumb-03.jpg"
                            className="img-fluid"
                            alt="Slider Img"
                          />
                        </div>
                        <div>
                          <img
                            src="/assets/img/services/service-thumb-04.jpg"
                            className="img-fluid"
                            alt="Slider Img"
                          />
                        </div>
                        <div>
                          <img
                            src="/assets/img/services/service-thumb-05.jpg"
                            className="img-fluid"
                            alt="Slider Img"
                          />
                        </div>
                        <div>
                          <img
                            src="/assets/img/services/service-thumb-06.jpg"
                            className="img-fluid"
                            alt="Slider Img"
                          />
                        </div>
                      </Slider>
                    </div>
                    <div className="accordion service-accordion">
                      <div className="accordion-item mb-4">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button p-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#overview"
                            aria-expanded="false"
                          >
                            Description
                          </button>
                        </h2>
                        <div
                          id="overview"
                          className="accordion-collapse collapse show"
                        >
                          <div className="accordion-body border-0 p-0 pt-3">
                            <p>{product.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item mb-4">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button p-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#include"
                            aria-expanded="false"
                          >
                            Ceci comprend
                          </button>
                        </h2>
                        <div
                          id="include"
                          className="accordion-collapse collapse show"
                        >
                          <div className="accordion-body border-0 p-0 pt-3">
                            <div className="bg-light-200 p-3 pb-2 br-10">
                              {product.includes.map((inc, index) => (
                                <p
                                  key={index}
                                  className="d-inline-flex align-items-center mb-2 me-4"
                                >
                                  <i className="feather icon-check-circle text-success me-2" />
                                  {inc}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item mb-4">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button p-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#gallery"
                            aria-expanded="false"
                          >
                            Gallery
                          </button>
                        </h2>
                        <div
                          id="gallery"
                          className="accordion-collapse collapse show"
                        >
                          <div className="accordion-body border-0 p-0 pt-3">
                            <Slider
                              {...two}
                              className="gallery-slider reactslick owl-carousel nav-center"
                            >
                              <Link
                                to="#"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                                className="gallery-item"
                              >
                                <img
                                  src="/assets/img/services/service-thumb-01.jpg"
                                  alt="img"
                                />
                              </Link>
                              <Link
                                to="#"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                                className="gallery-item"
                              >
                                <img
                                  src="/assets/img/services/service-thumb-02.jpg"
                                  alt="img"
                                />
                              </Link>
                              <Link
                                to="#"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                                className="gallery-item"
                              >
                                <img
                                  src="/assets/img/services/service-thumb-03.jpg"
                                  alt="img"
                                />
                              </Link>
                              <Link
                                to="#"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                                className="gallery-item"
                              >
                                <img
                                  src="/assets/img/services/service-thumb-04.jpg"
                                  alt="img"
                                />
                              </Link>
                              <Link
                                to="#"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                                className="gallery-item"
                              >
                                <img
                                  src="/assets/img/services/service-thumb-05.jpg"
                                  alt="img"
                                />
                              </Link>
                              <Link
                                to="#"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                                className="gallery-item"
                              >
                                <img
                                  src="/assets/img/services/service-thumb-06.jpg"
                                  alt="img"
                                />
                              </Link>
                              <Link
                                to="#"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                                className="gallery-item"
                              >
                                <img
                                  src="/assets/img/services/service-thumb-03.jpg"
                                  alt="img"
                                />
                              </Link>
                            </Slider>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item mb-4">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button p-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#video"
                            aria-expanded="false"
                          >
                            Video
                          </button>
                        </h2>
                        <div
                          id="video"
                          className="accordion-collapse collapse show"
                        >
                          <div className="accordion-body border-0 p-0 pt-3">
                            <div className="video-wrap">
                              <Link
                                className="video-btn video-effect"
                                data-fancybox=""
                                onClick={handleOpenModal}
                                to="#"
                              >
                                <i className="fa-solid fa-play" />
                              </Link>
                            </div>
                            <VideoModal
                              show={showModal}
                              handleClose={handleCloseModal}
                              videoUrl={videoUrl}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item mb-0">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button p-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq"
                            aria-expanded="false"
                          >
                            FAQ
                          </button>
                        </h2>
                        <div
                          id="faq"
                          className="accordion-collapse collapse show"
                        >
                          <div className="accordion-body border-0 p-0 pt-3">
                            <div
                              className="accordion accordion-customicon1 faq-accordion"
                              id="accordionfaq"
                            >
                              {product.faq.map((faq, index) => (
                                <div
                                  key={index}
                                  className="accordion-item bg-light-200"
                                >
                                  <h2 className="accordion-header">
                                    <button
                                      className="accordion-button bg-light-200 br-10 fs-16 fw-medium collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#faq4"
                                      aria-expanded="false"
                                    >
                                      {faq.question}
                                    </button>
                                  </h2>
                                  <div
                                    id="faq4"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionfaq"
                                  >
                                    <div className="accordion-body border-0 pt-0">
                                      <p>{faq.answer}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border-0 mb-xl-0 mb-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <h4 className="mb-3">Reviews (45)</h4>
                      {show && (
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add-review"
                          className="btn btn-dark btn-sm mb-3"
                        >
                          Write a Review
                        </Link>
                      )}
                    </div>
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <div className="rating-item bg-light-500 text-center mb-3">
                          <h5 className="mb-3">
                            Customer Reviews &amp; Ratings
                          </h5>
                          <div className="d-inline-flex align-items-center justify-content-center">
                            <i className="ti ti-star-filled text-warning me-1" />
                            <i className="ti ti-star-filled text-warning me-1" />
                            <i className="ti ti-star-filled text-warning me-1" />
                            <i className="ti ti-star-filled text-warning me-1" />
                            <i className="ti ti-star-filled text-warning" />
                          </div>
                          <p className="mb-3">(4.9 out of 5.0)</p>
                          <p className="text-gray-9">Based On 2,459 Reviews</p>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="rating-progress mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">
                              5 Star Ratings
                            </p>
                            <div
                              className="progress w-100"
                              role="progressbar"
                              aria-valuenow={90}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: '90%' }}
                              />
                            </div>
                            <p className="progress-count ms-2">2,547</p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">
                              4 Star Ratings
                            </p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={80}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: '80%' }}
                              />
                            </div>
                            <p className="progress-count ms-2">1,245</p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">
                              3 Star Ratings
                            </p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={70}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: '70%' }}
                              />
                            </div>
                            <p className="progress-count ms-2">600</p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">
                              2 Star Ratings
                            </p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={90}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: '60%' }}
                              />
                            </div>
                            <p className="progress-count ms-2">560</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <p className="me-2 text-nowrap mb-0">
                              1 Star Ratings
                            </p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={40}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: '40%' }}
                              />
                            </div>
                            <p className="progress-count ms-2">400</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card review-item mb-3">
                      <div className="card-body p-3">
                        <div className="review-info">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <img
                                  src="/assets/img/profiles/avatar-01.jpg"
                                  className="rounded-circle"
                                  alt="img"
                                />
                              </span>
                              <div>
                                <h6 className="fs-16 fw-medium">
                                  Adrian Hendriques
                                </h6>
                                <div className="d-flex align-items-center flex-wrap date-info">
                                  <p className="fs-14 mb-0">2 days ago</p>
                                  <p className="fs-14 mb-0">
                                    Excellent service!
                                  </p>
                                </div>
                              </div>
                            </div>
                            <span className="badge bg-success d-inline-flex align-items-center mb-2">
                              <i className="ti ti-star-filled me-1" />5
                            </span>
                          </div>
                          <p className="mb-2">
                            The electricians were prompt, professional, and
                            resolved our issues quickly.did a fantastic job
                            upgrading our electrical panel. Highly recommend
                            them for any electrical work.
                          </p>
                          <div className="d-flex align-items-center justify-content-between flex-wrap like-info">
                            <div className="d-inline-flex align-items-center">
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-up me-2" />
                                Reply
                              </Link>
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-up me-2" />
                                Like
                              </Link>
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center"
                              >
                                <i className="ti ti-thumb-down me-2" />
                                Dislike
                              </Link>
                            </div>
                            <div className="d-inline-flex align-items-center">
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-up me-2" />
                                45
                              </Link>
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-down me-2" />
                                21
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="review-info reply mt-2 p-3">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <img
                                  src="/assets/img/profiles/avatar-02.jpg"
                                  className="rounded-circle"
                                  alt="img"
                                />
                              </span>
                              <div>
                                <h6 className="fs-16 fw-medium">
                                  Stephen Vance
                                </h6>
                                <div className="d-flex align-items-center flex-wrap date-info">
                                  <p className="fs-14 mb-0">2 days ago</p>
                                  <p className="fs-14 mb-0">
                                    Excellent service!
                                  </p>
                                </div>
                              </div>
                            </div>
                            <span className="badge bg-success d-inline-flex align-items-center mb-2">
                              <i className="ti ti-star-filled me-1" />4
                            </span>
                          </div>
                          <p className="mb-2">
                            Thank You!!! For Your Appreciation!!!
                          </p>
                          <div className="d-flex align-items-center justify-content-between flex-wrap like-info">
                            <div className="d-inline-flex align-items-center flex-wrap">
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-up me-2" />
                                Reply
                              </Link>
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-up me-2" />
                                Like
                              </Link>
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center"
                              >
                                <i className="ti ti-thumb-down me-2" />
                                Dislike
                              </Link>
                            </div>
                            <div className="d-inline-flex align-items-center">
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-up me-2" />
                                45
                              </Link>
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-down me-2" />
                                20
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card review-item mb-3">
                      <div className="card-body p-3">
                        <div className="review-info">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <img
                                  src="/assets/img/profiles/avatar-03.jpg"
                                  className="rounded-circle"
                                  alt="img"
                                />
                              </span>
                              <div>
                                <h6 className="fs-16 fw-medium">Don Rosales</h6>
                                <div className="d-flex align-items-center flex-wrap date-info">
                                  <p className="fs-14 mb-0">2 days ago</p>
                                  <p className="fs-14 mb-0">Great Service!</p>
                                </div>
                              </div>
                            </div>
                            <span className="badge bg-danger d-inline-flex align-items-center mb-2">
                              <i className="ti ti-star-filled me-1" />1
                            </span>
                          </div>
                          <p className="mb-2">
                            The quality of work was exceptional, and they left
                            the site clean and tidy. I was impressed by their
                            attention to detail and commitment to safety
                            standards. Highly recommend their services!
                          </p>
                          <div className="d-flex align-items-center justify-content-between flex-wrap like-info">
                            <div className="d-inline-flex align-items-center flex-wrap">
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-up me-2" />
                                Reply
                              </Link>
                            </div>
                            <div className="d-inline-flex align-items-center">
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-up me-2" />
                                15
                              </Link>
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-down me-2" />1
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card review-item mb-3">
                      <div className="card-body p-3">
                        <div className="review-info">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <img
                                  src="/assets/img/profiles/avatar-04.jpg"
                                  className="rounded-circle"
                                  alt="img"
                                />
                              </span>
                              <div>
                                <h6 className="fs-16 fw-medium">Paul Bronk</h6>
                                <div className="d-flex align-items-center flex-wrap date-info">
                                  <p className="fs-14 mb-0">2 days ago</p>
                                  <p className="fs-14 mb-0">
                                    Reliable and Trustworthy!
                                  </p>
                                </div>
                              </div>
                            </div>
                            <span className="badge bg-success d-inline-flex align-items-center mb-2">
                              <i className="ti ti-star-filled me-1" />1
                            </span>
                          </div>
                          <p className="mb-2">
                            The quality of work was exceptional, and they left
                            the site clean and tidy. I was impressed by their
                            attention to detail and commitment to safety
                            standards. Highly recommend their services!
                          </p>
                          <div className="d-flex align-items-center justify-content-between flex-wrap like-info">
                            <div className="d-inline-flex align-items-center flex-wrap">
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-up me-2" />
                                Reply
                              </Link>
                            </div>
                            <div className="d-inline-flex align-items-center">
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-up me-2" />
                                10
                              </Link>
                              <Link
                                to="#"
                                className="d-inline-flex align-items-center me-2"
                              >
                                <i className="ti ti-thumb-down me-2" />2
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <Link to="#" className="btn btn-light btn-sm">
                        Load More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 theiaStickySidebar">
                <StickyBox>
                  <div className="card border-0">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-center border-bottom mb-3">
                        <h4 className="display-6 mb-3">
                          {renderPrice(product.price, product.priceType)}
                        </h4>
                      </div>
                      {show && (
                        <Link
                          to={Routes.home}
                          className="btn btn-lg btn-primary w-100 d-flex align-items-center justify-content-center"
                        >
                          <i className="ti ti-calendar me-2" />
                          Book Service
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="card border-0">
                    <div className="card-body">
                      <h4 className="mb-3">Prestatire</h4>
                      <div className="provider-info text-center bg-light-500 p-3 mb-3">
                        <div className="avatar avatar-xl mb-3">
                          <img
                            src={product.serviceProvider.avatar?.filePath}
                            alt="img"
                            className="img-fluid rounded-circle"
                          />
                          <span className="service-active-dot">
                            <i className="ti ti-check" />
                          </span>
                        </div>
                        <h5>Thomas Herzberg</h5>
                        <p className="fs-14">
                          <i className="ti ti-star-filled text-warning me-2" />
                          <span className="text-gray-9 fw-semibold">
                            4.9
                          </span>{' '}
                          (255 reviews)
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">
                          <i className="ti ti-user text-default me-2" />
                          Membre depuis
                        </h6>
                        {product.serviceProvider.createdAt && (
                          <p>{renderDate(product.serviceProvider.createdAt)}</p>
                        )}
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">
                          <i className="ti ti-mail me-1" />
                          Email
                        </h6>
                        <p>{product.serviceProvider.email}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">
                          <i className="ti ti-phone me-1" />
                          Téléphone
                        </h6>
                        <p>{product.serviceProvider.phone}</p>
                      </div>
                      {show && (
                        <div className="row border-top pt-3 g-2">
                          <div className="col-sm-12">
                            <Link
                              to="#"
                              data-bs-toggle="modal"
                              data-bs-target="#add-contact"
                              className="btn btn-dark btn-lg fs-14 px-1 w-100"
                            >
                              <i className="ti ti-user me-2" />
                              Contact Provider
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {show && (
                    <Link to="#" className="text-danger fs-14">
                      <i className="ti ti-pennant-filled me-2" />
                      Report Service
                    </Link>
                  )}
                </StickyBox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            src: '/assets/img/services/service-slider-02.jpg',
          },
          {
            src: '/assets/img/services/service-slider-03.jpg',
          },
          {
            src: '/assets/img/services/service-slider-01.jpg',
          },
          {
            src: '/assets/img/services/service-slider-04.jpg',
          },
          {
            src: '/assets/img/services/service-slider-05.jpg',
          },
        ]}
      />
    </>
  );
}
