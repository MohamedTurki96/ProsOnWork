import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { ShopGetDTO } from "../../dtos/catalog/shop.dto";


@SerializeableCommand({ resource: "shop", action: "delete" })
export class ShopDeleteCommand implements ICommand<ShopGetDTO> {
  constructor(readonly payload: ShopGetDTO) {}
}
