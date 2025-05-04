import { IQuery, SerializeableQuery } from "@pros-on-work/utils"

import { ShopGetDTO } from "../../dtos/catalog/shop.dto";

@SerializeableQuery({ resource: "shop", action: "read" })
export class ShopGetQuery implements IQuery<ShopGetDTO> {
  constructor(readonly payload: ShopGetDTO) {}
}
