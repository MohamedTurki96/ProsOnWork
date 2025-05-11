import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReservationDTO, ReservationStatus } from '../../../api';
import { AppLoader } from '../../../components/AppLoader';
import { Img } from '../../../components/Img';
import { useProduct } from '../../../hooks/useProducts';
import {
  useReservationCancel,
  useReservations,
} from '../../../hooks/useReservations';
import { useShop } from '../../../hooks/useShop';
import { useUser } from '../../../hooks/useUser';
import { Routes } from '../../../router/routes/routes';
import {
  getGeolocationText,
  stringToAddress,
} from '../../../utils/getGeolocationText';
import { renderPrice } from '../../../utils/renderPrice';

export function Reservations() {
  const { data: reservations } = useReservations();

  if (!reservations) {
    return <AppLoader />;
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
        <h4>Reservations</h4>
      </div>
      {reservations.items.map((reservation) => (
        <ReservationLine reservation={reservation} key={reservation.id} />
      ))}
    </>
  );
}

type ReservationLineProps = {
  reservation: ReservationDTO;
};

export function ReservationLine({ reservation }: ReservationLineProps) {
  const { data: product } = useProduct(reservation.productId);
  const { data: shop } = useShop(product?.shopId);
  const { data: provider } = useUser(shop?.ownerId);
  const [geoLocationText, setGeoLocationText] = useState('');
  const { mutate: cancel } = useReservationCancel();

  useEffect(() => {
    (async function () {
      if (shop && shop.address) {
        setGeoLocationText(
          await getGeolocationText(stringToAddress(shop.address)),
        );
      }
    })();
  }, [setGeoLocationText, shop]);

  if (!product || !shop || !provider) {
    return <></>;
  }

  const img = product.medias?.length ? product.medias[0] : null;
  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);

  return (
    <div className="card shadow-none booking-list">
      <div className="card-body d-md-flex align-items-center">
        <div className="booking-widget d-sm-flex align-items-center row-gap-3 flex-fill  mb-3 mb-md-0">
          <div className="booking-img me-sm-3 mb-3 mb-sm-0">
            {img && (
              <Link
                to={`${Routes.reservations}/${reservation.id}`}
                className="avatar"
              >
                <Img mediaId={img} />
              </Link>
            )}
          </div>
          <div className="booking-det-info">
            <h6 className="mb-3">
              <Link to={`${Routes.reservations}/${reservation.id}`}>
                {product.name}
              </Link>
              <span
                className={`badge badge-soft-${reservation.status == ReservationStatus.Pending ? 'warning' : reservation.status == ReservationStatus.Confirmed ? 'success' : 'danger'} ms-2`}
              >
                {reservation.status}
              </span>
            </h6>
            <ul className="booking-details">
              <li className="d-flex align-items-center mb-2">
                <span className="book-item">Date</span>
                <small className="me-2">: </small>
                {start.toLocaleString()} - {end.toLocaleString()}
              </li>
              <li className="d-flex align-items-center mb-2">
                <span className="book-item">Amount</span>
                <small className="me-2">: </small>{' '}
                {renderPrice(product.price, product.priceType)}
              </li>
              <li className="d-flex align-items-center mb-2">
                <span className="book-item">Location</span>
                <small className="me-2">: </small> {geoLocationText}
              </li>
              <li className="d-flex align-items-center flex-wrap">
                <span className="book-item">Provider</span>
                <small className="me-2">: </small>
                <div className="user-book d-flex align-items-center flex-wrap me-2">
                  <div className="avatar avatar-xs me-2">
                    <Img mediaId={provider.avatarId} />
                  </div>
                  {provider.name}
                </div>
                <p className="mb-0 me-2">
                  <i className="ti ti-point-filled fs-10 text-muted me-2" />
                  {provider.email}
                </p>
                <p>
                  <i className="ti ti-point-filled fs-10 text-muted me-2" />
                  {provider.phone}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="text-end">
            <div className="d-flex align-items-center flex-wrap row-gap-2">
              {reservation.status == ReservationStatus.Canceled ? (
                <></>
              ) : (
                <>
                  <Link to={Routes.chat} className="btn btn-dark me-2">
                    <i className="ti ti-message-2 me-2" />
                    Chat
                  </Link>
                  {reservation.status == ReservationStatus.Pending && (
                    <button
                      className="btn btn-light"
                      onClick={() => cancel(reservation.id)}
                    >
                      Cancel
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
