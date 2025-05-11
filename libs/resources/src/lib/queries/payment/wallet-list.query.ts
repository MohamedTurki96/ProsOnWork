import { IQuery, SerializeableQuery } from '@pros-on-work/utils';

import { WalletListDTO } from '../../dtos/payment/wallet-list.dto';

@SerializeableQuery({ resource: 'wallet', action: 'list' })
export class WalletListQuery implements IQuery<WalletListDTO> {
  constructor(readonly payload: WalletListDTO) {}
}
