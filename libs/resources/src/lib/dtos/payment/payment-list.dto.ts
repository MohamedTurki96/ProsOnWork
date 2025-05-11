import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuerySortOrder } from '@pros-on-work/utils';
import { Expose } from 'class-transformer';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { PaginationDTO, PaginationResultDTO } from '../../pagination.dto';

import { PaymentDTO, PaymentType } from './payment.dto';

export class PaymentListWhereDTO {
  @IsOptional()
  @IsEnum(PaymentType)
  @Expose()
  @ApiPropertyOptional({ enum: PaymentType, enumName: 'PaymentType' })
  type?: PaymentType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  walletId?: number;
}

export enum PaymentListSortProperty {
  CreatedAt = 'createdAt',
}

export class PaymentListSortDTO {
  @IsDefined()
  @IsEnum(PaymentListSortProperty)
  @Expose()
  @ApiPropertyOptional({
    enum: PaymentListSortProperty,
    enumName: 'PaymentListSortProperty',
    default: PaymentListSortProperty.CreatedAt,
  })
  property: PaymentListSortProperty = PaymentListSortProperty.CreatedAt;

  @IsDefined()
  @IsEnum(QuerySortOrder)
  @Expose()
  @ApiPropertyOptional({
    enum: QuerySortOrder,
    enumName: 'QuerySortOrder',
    default: QuerySortOrder.DESC,
  })
  order: QuerySortOrder = QuerySortOrder.DESC;
}

export class PaymentListDTO extends PaginationDTO {
  @IsOptional()
  @IsObject()
  @Type(() => PaymentListWhereDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: PaymentListWhereDTO })
  where?: PaymentListWhereDTO;

  @IsDefined()
  @Type(() => PaymentListSortDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: PaymentListSortDTO })
  sort: PaymentListSortDTO = new PaymentListSortDTO();
}

export class PaymentListResultDTO extends PaginationResultDTO<PaymentDTO> {
  @IsDefined()
  @IsArray()
  @IsDefined({ each: true })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => PaymentDTO)
  @Expose()
  @ApiProperty({ type: PaymentDTO, isArray: true })
  override items: PaymentDTO[];
}
