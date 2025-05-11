import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaymentCreateCashInDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  amount: number;
}
