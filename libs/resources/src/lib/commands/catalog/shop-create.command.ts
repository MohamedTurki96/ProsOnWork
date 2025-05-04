import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { ShopCreateDTO } from "../../dtos/catalog/shop.dto";



@SerializeableCommand({ resource: "shop", action: "create" })
export class ShopCreateCommand implements ICommand<ShopCreateDTO> {
  constructor(readonly payload: ShopCreateDTO) {}
}
