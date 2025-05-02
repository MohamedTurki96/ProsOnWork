import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { ProductUpdateCommandDTO } from "../../dtos/catalog/product.dto";



@SerializeableCommand({ resource: 'product', action: 'update' })
export class ProductUpdateCommand implements ICommand<ProductUpdateCommandDTO> {
  constructor(readonly payload: ProductUpdateCommandDTO) {}
}
