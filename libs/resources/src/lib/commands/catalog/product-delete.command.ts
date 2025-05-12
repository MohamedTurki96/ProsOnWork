import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { ProductGetDTO } from "../../dtos/catalog/product.dto";


@SerializeableCommand({ resource: "product", action: "delete" })
export class ProductDeleteCommand implements ICommand<ProductGetDTO> {
  constructor(readonly payload: ProductGetDTO) {}
}
