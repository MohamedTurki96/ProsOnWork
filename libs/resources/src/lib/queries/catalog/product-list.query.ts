import { IQuery, SerializeableQuery } from "@pros-on-work/utils";

import { ProductListDTO } from "../../dtos/catalog/product-list.dto";


@SerializeableQuery({ resource: "product", action: "list" })
export class ProductListQuery implements IQuery<ProductListDTO> {
  constructor(readonly payload: ProductListDTO) {}
}
