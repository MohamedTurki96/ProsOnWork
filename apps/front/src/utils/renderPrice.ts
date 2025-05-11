import { PriceType } from '../api';

export function renderPrice(
  price: number,
  type: PriceType = PriceType.Package,
) {
  return price + `${type == PriceType.Hour ? '/h' : ''}` + ' $';
}
