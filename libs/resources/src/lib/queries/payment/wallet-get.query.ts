import { IQuery, SerializeableQuery } from "@pros-on-work/utils"

import { WalletGetDTO } from "../../dtos/payment/wallet.dto";


@SerializeableQuery({ resource: "wallet", action: "read" })
export class WalletGetQuery implements IQuery<WalletGetDTO> {
  constructor(readonly payload: WalletGetDTO) {}
}
