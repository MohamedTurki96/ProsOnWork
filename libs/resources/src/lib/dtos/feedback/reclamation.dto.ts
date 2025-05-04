import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export const ReclamationStatus = {
  Open: 'open',
  InProgress: 'inProgress',
  Resolved: 'resolved',
} as const;

export type ReclamationStatus =
  (typeof ReclamationStatus)[keyof typeof ReclamationStatus];

export class ReclamationDTO {
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
  @IsString()
  @Expose()
  @ApiProperty()
  comment: string;

  @IsNotEmpty()
  @IsEnum(ReclamationStatus)
  @Expose()
  @ApiProperty({ enum: ReclamationStatus, enumName: 'ReclamationStatus' })
  status: ReclamationStatus;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class ReclamationCreateDTO {
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
  @IsString()
  @Expose()
  @ApiProperty()
  comment: string;
}

export class ReclamationUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsEnum(ReclamationStatus)
  @Expose()
  @ApiProperty({ enum: ReclamationStatus, enumName: 'ReclamationStatus' })
  status: ReclamationStatus;
}
