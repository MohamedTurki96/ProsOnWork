import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { ProductCreateDTO } from "../../dtos/catalog/product.dto";


@SerializeableCommand({ resource: "product", action: "create" })
export class ProductCreateCommand implements ICommand<ProductCreateDTO> {
  constructor(readonly payload: ProductCreateDTO) {}
}
