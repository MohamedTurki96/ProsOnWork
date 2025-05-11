import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FeedbackCreateDTO, ReservationStatus } from '../../../api';
import { AppLoader } from '../../../components/AppLoader';
import { Img } from '../../../components/Img';
import { RatingDisplay } from '../../../components/Rating/RatingDisplay';
import { useConnectedUser } from '../../../hooks/useAuth';
import { useCreateFeedback, useFeedback } from '../../../hooks/useFeedback';
import { useProduct } from '../../../hooks/useProducts';
import { useReservation } from '../../../hooks/useReservations';
import { useShop } from '../../../hooks/useShop';
import { useUser } from '../../../hooks/useUser';
import { Routes } from '../../../router/routes/routes';
import { renderPrice } from '../../../utils/renderPrice';

export function BookingDetails() {
  const params = useParams();
  const { data: reservation } = useReservation(
    params?.id ? Number(params.id) : NaN,
  );
  const { data: user } = useConnectedUser();
  const { data: product } = useProduct(reservation?.productId);
  const { data: shop } = useShop(product?.shopId);
  const { data: provider } = useUser(shop?.ownerId);
  const { data: feedback } = useFeedback(user?.id, product?.id);
  const closeRef = useRef<HTMLAnchorElement>(null);
  const [data, setData] = useState<FeedbackCreateDTO>({
    productId: 0,
    userId: 0,
    comment: '',
    rating: 0,
  });

  const onSuccess = useCallback(() => {
    closeRef.current?.click();
  }, [closeRef]);

  const { mutate } = useCreateFeedback(onSuccess);

  useEffect(() => {
    if (product && user) {
      setData({
        productId: product.id,
        userId: user.id,
        comment: '',
        rating: 0,
      });
    }
  }, [product, user]);

  if (!params.id) {
    return null;
  }

  if (!reservation || !product || !shop || !provider) {
    return <AppLoader />;
  }

  const img = product.medias?.length ? product.medias[0] : null;

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10 mx-auto">
        <div className="row booking-details">
          <div className="col-md-4">
            <div>
              <h4 className="mb-2">Reservation ID: {reservation.id}</h4>
              <p className="fs-12">
                <i className="feather icon-calendar me-1" />{' '}
                {new Date(reservation.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="d-flex gap-3 justify-content-end">
              <Link
                to="#"
                className="btn btn-light d-flex align-items-center justify-content-center"
              >
                <i className="ti ti-printer me-1" />
                Print
              </Link>
            </div>
          </div>
        </div>
        {/* Slot Booked */}
        <div className="slot-box mt-3">
          <div className="row">
            <div className="col-md-3">
              <div className="slot-booked">
                <h6>Date</h6>
                <ul>
                  <li className="fs-12 d-flex align-items-center mb-2">
                    <i className="feather icon-calendar me-1" />{' '}
                    {new Date(reservation.startDate).toLocaleString()}
                  </li>
                  <li className="fs-12 d-flex align-items-center">
                    <i className="feather icon-calendar  me-1" />{' '}
                    {new Date(reservation.endDate).toLocaleString()}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="slot-user">
                <h6>Provider</h6>
                <div className="slot-chat">
                  <div className="slot-user-img d-flex align-items-center">
                    <Img
                      className="avatar rounded-circle  me-2"
                      mediaId={provider.avatarId}
                    />
                    <div className="slot-user-info">
                      <p className="mb-1 fs-12">{provider.name}</p>
                      <p className="mb-0 fs-12">{provider.email}</p>
                    </div>
                  </div>
                  <div className="chat-item d-flex align-items-center">
                    <div className="slot-user-info">
                      <p className="mb-0 fs-12">{provider.phone}</p>
                    </div>
                    <div>
                      <Link
                        to={Routes.chat}
                        className="btn btn-sm btn-dark d-flex align-items-center"
                      >
                        <i className="ti ti-message me-1" /> Chat
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="slot-action">
                <h6>Statut</h6>
                <span
                  className={`badge badge-soft-${reservation.status == ReservationStatus.Pending ? 'warning' : reservation.status == ReservationStatus.Confirmed ? 'success' : 'danger'} ms-2`}
                >
                  {reservation.status}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-summary">
          <div className="row">
            <div className="col order-summary">
              <h6 className="order-title">Service</h6>
              <div className="ord-summary">
                <div className="order-amt">
                  <div className="order-info">
                    <div className="order-img">
                      {img && (
                        <Img
                          className="avatar rounded-circle  me-2"
                          mediaId={img}
                        />
                      )}
                    </div>
                    <div className="order-profile">
                      <h6>{product.name}</h6>
                    </div>
                  </div>
                  <h5>{renderPrice(product.price, product.priceType)}</h5>
                </div>
              </div>
            </div>
            <div className="row booking">
              <div className="col-md-6">
                <h6 className="order-title">History</h6>
                <div className="book-history">
                  <ul>
                    <li>
                      <h6>Booking</h6>
                      <p>
                        <i className="ti ti-calendar me-1" />{' '}
                        {new Date(reservation.createdAt).toLocaleString()}
                      </p>
                    </li>
                    {reservation.status !== ReservationStatus.Pending && (
                      <li>
                        <h6>
                          {reservation.status == ReservationStatus.Canceled
                            ? 'Canceled'
                            : 'Accepted'}
                        </h6>
                        <p>
                          <i className="ti ti-calendar me-1" />{' '}
                          {reservation.status == ReservationStatus.Canceled
                            ? reservation.canceledAt
                              ? new Date(
                                  reservation.canceledAt,
                                ).toLocaleString()
                              : ''
                            : reservation.acceptedAT
                              ? new Date(
                                  reservation.acceptedAT,
                                ).toLocaleString()
                              : ''}
                        </p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              {reservation.status !== ReservationStatus.Pending && (
                <div className="col-md-6">
                  <div className="order-reviews">
                    <div className="row align-items-center mb-4">
                      <div className="col-5">
                        <h6 className="order-title">Reviews</h6>
                      </div>
                      {!feedback && (
                        <div className="col-7 text-end d-flex justify-content-end">
                          <Link
                            to="#"
                            className="btn btn-sm d-flex align-items-center btn-dark"
                            data-bs-toggle="modal"
                            data-bs-target="#add-review"
                          >
                            <i className="feather icon-plus-circle me-2" />
                            Add Review
                          </Link>
                          <div
                            className="modal fade custom-modal"
                            id="add-review"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header d-flex align-items-center justify-content-between  border-0">
                                  <h5>Ajouter un review</h5>
                                  <Link
                                    to="#"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    ref={closeRef}
                                    onClick={() =>
                                      setData({
                                        ...data,
                                        comment: '',
                                        rating: 0,
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
                                        <div className="mb-3 d-flex align-items-center justify-content-between">
                                          <label className="form-label  me-2">
                                            Rating
                                          </label>
                                          <RatingDisplay
                                            rating={data.rating!}
                                            onClick={(rating) =>
                                              setData({
                                                ...data,
                                                rating,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="row">
                                          <div className="col-md-12">
                                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                              <label className="form-label me-2">
                                                Commentaire
                                              </label>
                                              <textarea
                                                className="form-control"
                                                name="name"
                                                onChange={(e) =>
                                                  setData({
                                                    ...data,
                                                    comment: e.target.value,
                                                  })
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
                                    onClick={() => mutate(data)}
                                    disabled={!!!data.comment}
                                  >
                                    Ajouter
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {feedback && (
                      <ul>
                        <li>
                          <div className="order-comment">
                            {feedback.rating && (
                              <RatingDisplay rating={feedback.rating} />
                            )}
                            <h6>{feedback.comment}</h6>
                            <p>
                              <i className="fa-solid fa-calendar-days me-1" />{' '}
                              {new Date(feedback.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
