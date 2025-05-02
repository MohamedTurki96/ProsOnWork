import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { ShopUpdateCommandDTO } from "../../dtos/catalog/shop.dto";




@SerializeableCommand({ resource: 'shop', action: 'update' })
export class ShopUpdateCommand implements ICommand<ShopUpdateCommandDTO> {
  constructor(readonly payload: ShopUpdateCommandDTO) {}
}
