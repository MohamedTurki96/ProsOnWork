import { Link } from 'react-router-dom';

import { ProductDTO } from '../../../../api';
import { Routes } from '../../../../router/routes/routes';
import { renderPrice } from '../../../../utils/renderPrice';

interface ServiceCardProps {
  product: ProductDTO;
}

export function ServiceCard({ product }: ServiceCardProps) {
  if (!product) {
    return <></>;
  }

  const image = product.me?.length
    ? product.images[0].filePath
    : 'assets/img/providers/provider-13.jpg';

  const avatar =
    product.serviceProvider.avatar?.filePath ??
    'assets/img/providers/provider-13.jpg';

  return (
    <div className="col-xl-4 col-md-6">
      <div className="card p-0">
        <div className="card-body p-0">
          <div className="img-sec w-100">
            <Link to={`${Routes.products}/${product.id}`}>
              <img
                src={image}
                className="img-fluid rounded-top w-100"
                alt="img"
              />
            </Link>
            <div className="image-tag d-flex justify-content-end align-items-center">
              <span className="trend-tag">{product.category.name}</span>
            </div>
            <span className="image-logo avatar avatar-md border rounded-circle">
              <img
                src={avatar}
                className="img-fluid rounded-circle "
                alt="logo"
              />
            </span>
          </div>
          <div className="p-3 d-flex align-items-center justify-content-between">
            <div>
              <h5 className="mb-2">
                <Link to={Routes.home}>{product.name}</Link>
              </h5>
              <span className="rating text-gray fs-14">
                <i className="fa fa-star filled me-1" />
                4.9
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h5>{renderPrice(product.price, product.priceType)}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
