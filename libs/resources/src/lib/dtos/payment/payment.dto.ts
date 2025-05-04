import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export const PaymentType = {
  CashIn: 'cashIn',
  CashOut: 'cashOut',
  Reservation: 'reservation',
} as const;

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

export const PaymentStatus = {
  Pending: 'pending',
  Completed: 'completed',
  Failed: 'failed',
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export class PaymentDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  walletId: number;

  @IsNotEmpty()
  @IsEnum(PaymentType)
  @Expose()
  @ApiProperty({ enum: PaymentType })
  type: PaymentType;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  amount: number;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  @Expose()
  @ApiProperty({ enum: PaymentStatus })
  status: PaymentStatus;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date;
}

export class PaymentCreateDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  walletId: number;

  @IsNotEmpty()
  @IsEnum(PaymentType)
  @Expose()
  @ApiProperty({ enum: PaymentType })
  type: PaymentType;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  amount: number;
}
