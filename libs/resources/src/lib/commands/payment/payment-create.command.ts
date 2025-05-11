import { ApiProperty } from '@nestjs/swagger';
import { ICommand, SerializeableCommand } from '@pros-on-work/utils';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { PaymentCreateCashInDTO } from '../../dtos/payment/payment-create.dto';


export class PaymentCreateCashInCommandDTO extends PaymentCreateCashInDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  userId: number;
}

@SerializeableCommand({ resource: 'payment', action: 'create-cash-in' })
export class PaymentCreateCashInCommand
  implements ICommand<PaymentCreateCashInCommandDTO>
{
  constructor(readonly payload: PaymentCreateCashInCommandDTO) {}
}
