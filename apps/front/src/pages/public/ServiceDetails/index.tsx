import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import StickyBox from 'react-sticky-box';
import Lightbox from 'yet-another-react-lightbox';

import {
  FeedbackDTO,
  ProductDTO,
  ReservationCreateDTO,
  UserDTO,
} from '../../../api';
import { AppLoader } from '../../../components/AppLoader';
import { Img } from '../../../components/Img';
import { RatingDisplay } from '../../../components/Rating/RatingDisplay';
import VideoModal from '../../../core/hooks/video-modal';
import { useConnectedUser } from '../../../hooks/useAuth';
import { useCategory } from '../../../hooks/useCategory';
import { useFeedbackForProduct } from '../../../hooks/useFeedback';
import { useProduct } from '../../../hooks/useProducts';
import {
  useCreateReservation,
  useReservations,
} from '../../../hooks/useReservations';
import { useShop } from '../../../hooks/useShop';
import { useUser } from '../../../hooks/useUser';
import { Routes } from '../../../router/routes/routes';
import {
  getGeolocationText,
  stringToAddress,
} from '../../../utils/getGeolocationText';
import { renderDate } from '../../../utils/renderDate';
import { renderPrice } from '../../../utils/renderPrice';

import 'yet-another-react-lightbox/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const groupBy = function (array: any[], key: string) {
  return array.reduce(function (rv, x) {
    (rv[x[key]] ??= []).push(x);
    return rv;
  }, {});
};

export function ServiceDetails() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id!);
  const { data: product } = useProduct(id);
  const { data: shop } = useShop(product?.shopId);
  const { data: provider } = useUser(shop?.ownerId);
  const { data: category } = useCategory(product?.categoryId);
  const { data: reservations } = useReservations(
    product?.id
      ? {
          productId: product?.id,
        }
      : {},
  );
  const { data: feedback } = useFeedbackForProduct(product?.id);
  const { data: user } = useConnectedUser();

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const [addressText, setAddressText] = useState('');
  const [openBooking, setOpenBooking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const videoUrl = 'https://www.youtube.com/watch?v=Vdp6x7Bibtk';
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

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
    if (shop?.address) {
      (async function () {
        setAddressText(
          await getGeolocationText(stringToAddress(shop.address!)),
        );
      })();
    }
  }, [setAddressText, shop]);

  const handleBook = useCallback(() => {
    if (!user) {
      navigate(Routes.login);
    } else {
      setOpenBooking(true);
    }
  }, [user, navigate, setOpenBooking]);

  if (
    !product ||
    !shop ||
    !provider ||
    !category ||
    !reservations ||
    !feedback
  ) {
    return <AppLoader />;
  }

  const total = feedback.items.reduce(
    (sum, feedback) => sum + (feedback.rating ?? 0),
    0,
  );
  const avg = feedback.items.length ? total / feedback.items.length : 0;
  const groups = groupBy(feedback.items, 'rating');
  const ratings = {
    1: {
      count: groups[1] && feedback.items.length ? groups[1].length : 0,
      avg:
        groups[1] && feedback.items.length
          ? (groups[1].length * 100) / feedback.items.length
          : 0,
    },
    2: {
      count: groups[2] && feedback.items.length ? groups[2].length : 0,
      avg:
        groups[2] && feedback.items.length
          ? (groups[2].length * 100) / feedback.items.length
          : 0,
    },
    3: {
      count: groups[3] && feedback.items.length ? groups[3].length : 0,
      avg:
        groups[3] && feedback.items.length
          ? (groups[3].length * 100) / feedback.items.length
          : 0,
    },
    4: {
      count: groups[4] && feedback.items.length ? groups[4].length : 0,
      avg:
        groups[4] && feedback.items.length
          ? (groups[4].length * 100) / feedback.items.length
          : 0,
    },
    5: {
      count: groups[5] && feedback.items.length ? groups[5].length : 0,
      avg:
        groups[5] && feedback.items.length
          ? (groups[5].length * 100) / feedback.items.length
          : 0,
    },
  };

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
                          <span className="me-1">
                            {reservations.items.length}
                          </span>{' '}
                          Bookings
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                        <div className="d-flex align-items-center flex-wrap">
                          {addressText && (
                            <p className="me-3 mb-2">
                              <i className="ti ti-map-pin me-2" />
                              {addressText}
                            </p>
                          )}
                          <p className="mb-2">
                            <i className="ti ti-star-filled text-warning me-2" />
                            <span className="text-gray-9">{avg}</span>(
                            {feedback.items.length}
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
                          {product.medias?.map((media) => (
                            <div className="service-img" key={media}>
                              <Img
                                mediaId={media}
                                className="img-fluid"
                                alt="Slider Img"
                              />
                            </div>
                          ))}
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
                        {product.medias?.map((media) => (
                          <div key={media}>
                            <Img
                              mediaId={media}
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                        ))}
                        {product.medias?.map((media) => (
                          <div key={media}>
                            <Img
                              mediaId={media}
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                        ))}
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
                      {product.includes && (
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
                      )}
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
                        {product.faq && (
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
                                    key={faq.question}
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
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border-0 mb-xl-0 mb-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <h4 className="mb-3">
                        Reviews ({feedback.items.length})
                      </h4>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <div className="rating-item bg-light-500 text-center mb-3">
                          <h5 className="mb-3">
                            Customer Reviews &amp; Ratings
                          </h5>
                          <div className="d-inline-flex align-items-center justify-content-center">
                            <RatingDisplay rating={avg} />
                          </div>
                          <p className="mb-3">({avg} out of 5.0)</p>
                          <p className="text-gray-9">
                            Based On {feedback.items.length} Reviews
                          </p>
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
                              aria-valuenow={ratings[5].avg}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: `${ratings[5].avg}%` }}
                              />
                            </div>
                            <p className="progress-count ms-2">
                              {ratings[5].count}
                            </p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">
                              4 Star Ratings
                            </p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={ratings[4].avg}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: `${ratings[4].avg}%` }}
                              />
                            </div>
                            <p className="progress-count ms-2">
                              {ratings[4].count}
                            </p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">
                              3 Star Ratings
                            </p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={ratings[3].avg}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: `${ratings[3].avg}%` }}
                              />
                            </div>
                            <p className="progress-count ms-2">
                              {ratings[3].count}
                            </p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">
                              2 Star Ratings
                            </p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={ratings[2].avg}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: `${ratings[2].avg}%` }}
                              />
                            </div>
                            <p className="progress-count ms-2">
                              {ratings[2].count}
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <p className="me-2 text-nowrap mb-0">
                              1 Star Ratings
                            </p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={ratings[1].avg}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: `${ratings[1].avg}%` }}
                              />
                            </div>
                            <p className="progress-count ms-2">
                              {ratings[1].count}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {feedback.items.map((feedback) => {
                      return <Comment feedback={feedback} key={feedback.id} />;
                    })}
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
                      <button
                        onClick={handleBook}
                        className="btn btn-lg btn-primary w-100 d-flex align-items-center justify-content-center"
                      >
                        <i className="ti ti-calendar me-2" />
                        Book Service
                      </button>
                    </div>
                  </div>
                  <div className="card border-0">
                    <div className="card-body">
                      <h4 className="mb-3">Prestatire</h4>
                      <div className="provider-info text-center bg-light-500 p-3 mb-3">
                        <div className="avatar avatar-xl mb-3">
                          <Img
                            mediaId={provider.avatarId}
                            alt="img"
                            className="img-fluid rounded-circle"
                          />
                          <span className="service-active-dot">
                            <i className="ti ti-check" />
                          </span>
                        </div>
                        <h5>{provider.name}</h5>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">
                          <i className="ti ti-user text-default me-2" />
                          Membre depuis
                        </h6>
                        {provider.createdAt && (
                          <p>{renderDate(provider.createdAt)}</p>
                        )}
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">
                          <i className="ti ti-mail me-1" />
                          Email
                        </h6>
                        <p>{provider.email}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">
                          <i className="ti ti-phone me-1" />
                          Téléphone
                        </h6>
                        <p>{provider.phone}</p>
                      </div>
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
                    </div>
                  </div>
                  <a
                    href={'#'}
                    className="text-danger fs-14"
                    onClick={() => navigate(Routes.login)}
                  >
                    <i className="ti ti-pennant-filled me-2" />
                    Report Service
                  </a>
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
      {user && (
        <BoookingModal
          onHide={() => setOpenBooking(false)}
          open={openBooking}
          product={product}
          user={user}
        />
      )}
    </>
  );
}

type CommentProps = {
  feedback: FeedbackDTO;
};

export function Comment({ feedback }: CommentProps) {
  const { data: user } = useUser(feedback.userId);

  if (!user) {
    return null;
  }

  return (
    <div className="card review-item mb-3">
      <div className="card-body p-3">
        <div className="review-info">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center mb-2">
              <span className="avatar avatar-lg me-2 flex-shrink-0">
                <Img
                  mediaId={user.avatarId}
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <div>
                <h6 className="fs-16 fw-medium">{user.name}</h6>
                <div className="d-flex align-items-center flex-wrap date-info">
                  <p className="fs-14 mb-0">
                    {new Date(feedback.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <span className="badge bg-success d-inline-flex align-items-center mb-2">
              <i className="ti ti-star-filled me-1" />
              {feedback.rating}
            </span>
          </div>
          <p className="mb-2">{feedback.comment}</p>
        </div>
      </div>
    </div>
  );
}

type BoookingModalProps = {
  open: boolean;
  onHide: () => any;
  product: ProductDTO;
  user: UserDTO;
};

export function BoookingModal({
  open,
  onHide,
  product,
  user,
}: BoookingModalProps) {
  const { mutate } = useCreateReservation(() => onHide());
  const [data, setData] = useState<ReservationCreateDTO>({
    productId: product.id,
    userId: user.id,
    startDate: '',
    endDate: '',
  });

  const handleCreateChange = useCallback(
    (key: keyof ReservationCreateDTO, value: any) => {
      setData({
        ...data,
        [key]: value,
      });
    },
    [setData, data],
  );

  return (
    <Modal show={open} centered onHide={onHide}>
      <Modal.Header>
        <h5>Réserver ce service</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) =>
                      handleCreateChange('startDate', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) =>
                      handleCreateChange('endDate', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => mutate(data)}
          disabled={!data.startDate || !data.endDate}
        >
          Ajouter
        </button>
      </Modal.Footer>
    </Modal>
  );
}
