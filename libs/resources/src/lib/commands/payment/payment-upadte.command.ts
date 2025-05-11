import { ICommand, SerializeableCommand } from '@pros-on-work/utils'

import { PaymentUpdateDTO } from '../../dtos/payment/payment.dto';


@SerializeableCommand({ resource: 'payment', action: 'update' })
export class PaymentUpdateCommand implements ICommand<PaymentUpdateDTO> {
  constructor(readonly payload: PaymentUpdateDTO) {}
}
