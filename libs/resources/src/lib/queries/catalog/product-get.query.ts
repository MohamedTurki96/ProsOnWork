import { IQuery, SerializeableQuery } from "@pros-on-work/utils"

import { ProductGetDTO } from "../../dtos/catalog/product.dto";

@SerializeableQuery({ resource: "product", action: "read" })
export class ProductGetQuery implements IQuery<ProductGetDTO> {
  constructor(readonly payload: ProductGetDTO) {}
}
