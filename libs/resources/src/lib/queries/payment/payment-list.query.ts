import { IQuery, SerializeableQuery } from '@pros-on-work/utils';

import { PaymentListDTO } from '../../dtos/payment/payment-list.dto';



@SerializeableQuery({ resource: 'payment', action: 'list' })
export class PaymentListQuery implements IQuery<PaymentListDTO> {
  constructor(readonly payload: PaymentListDTO) {}
}
