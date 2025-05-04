import { IQuery, SerializeableQuery } from "@pros-on-work/utils";

import { ShopListDTO } from "../../dtos/catalog/shop-list.dto";


@SerializeableQuery({ resource: "shop", action: "list" })
export class ShopListQuery implements IQuery<ShopListDTO> {
  constructor(readonly payload: ShopListDTO) {}
}
