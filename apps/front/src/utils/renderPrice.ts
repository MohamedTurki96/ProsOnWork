import { PriceTypeEnum } from '../api';

export function renderPrice(
  price: number,
  type: PriceTypeEnum = PriceTypeEnum.PACKAGE,
) {
  return price + `${type == PriceTypeEnum.HOUR ? '/h' : ''}` + ' TND';
}
