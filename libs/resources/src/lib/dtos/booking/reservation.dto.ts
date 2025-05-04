import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export const ReservationStatus = {
  Pending: 'pending',
  Confirmed: 'confirmed',
  Canceled: 'canceled',
} as const;
export type ReservationStatus =
  (typeof ReservationStatus)[keyof typeof ReservationStatus];

export class ReservationDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  productId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  endDate: Date;

  @IsNotEmpty()
  @IsEnum(ReservationStatus)
  @Expose()
  @ApiProperty({ enum: ReservationStatus, enumName: 'ReservationStatus' })
  status: ReservationStatus;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class ReservationCreateDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  productId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  endDate: Date;
}

export class ReservationUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

  @IsEnum(ReservationStatus)
  @IsNotEmpty()
  @ApiProperty({ enum: ReservationStatus })
  status: ReservationStatus;
}
