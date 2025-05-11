import { Link } from 'react-router-dom';

import { ProductDTO } from '../../../../api';
import { Img } from '../../../../components/Img';
import { useCategory } from '../../../../hooks/useCategory';
import { useShop } from '../../../../hooks/useShop';
import { useUser } from '../../../../hooks/useUser';
import { Routes } from '../../../../router/routes/routes';
import { renderPrice } from '../../../../utils/renderPrice';

interface ServiceCardProps {
  product: ProductDTO;
}

export function ServiceCard({ product }: ServiceCardProps) {
  const { data: shop } = useShop(product.shopId);
  const { data: provider } = useUser(shop?.ownerId);
  const { data: category } = useCategory(product.categoryId);

  if (!shop || !provider || !category) {
    return <></>;
  }

  const image = product.medias?.length ? product.medias[0] : null;
  
  return (
    <div className="col-xl-4 col-md-6">
      <div className="card p-0">
        <div className="card-body p-0">
          <div className="img-sec w-100">
            <Link to={`${Routes.products}/${product.id}`}>
              {image && (
                <Img
                  mediaId={image}
                  className="img-fluid rounded-top w-100"
                  alt="img"
                />
              )}
            </Link>
            <div className="image-tag d-flex justify-content-end align-items-center">
              <span className="trend-tag">{category.name}</span>
            </div>
            <span className="image-logo avatar avatar-md border rounded-circle">
              <Img
                mediaId={provider.avatarId}
                className="img-fluid rounded-circle "
                alt="logo"
              />
            </span>
          </div>
          <div className="p-3 d-flex align-items-center justify-content-between">
            <div>
              <h5 className="mb-2">
                <Link to={`${Routes.products}/${product.id}`}>{product.name}</Link>
              </h5>
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
