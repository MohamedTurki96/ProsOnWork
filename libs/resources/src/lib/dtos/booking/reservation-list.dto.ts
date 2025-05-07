import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuerySortOrder } from '@pros-on-work/utils';
import { Expose } from 'class-transformer';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { PaginationDTO, PaginationResultDTO } from '../../pagination.dto';

import { ReservationDTO } from './reservation.dto';

export class ReservationListWhereDTO {}

export enum ReservationListSortProperty {
  CreatedAt = 'createdAt',
}

export class ReservationListSortDTO {
  @IsDefined()
  @IsEnum(ReservationListSortProperty)
  @Expose()
  @ApiPropertyOptional({
    enum: ReservationListSortProperty,
    enumName: 'ReservationListSortProperty',
    default: ReservationListSortProperty.CreatedAt,
  })
  property: ReservationListSortProperty = ReservationListSortProperty.CreatedAt;

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

export class ReservationListDTO extends PaginationDTO {
  @IsOptional()
  @IsObject()
  @Type(() => ReservationListWhereDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: ReservationListWhereDTO })
  where?: ReservationListWhereDTO;

  @IsDefined()
  @Type(() => ReservationListSortDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: ReservationListSortDTO })
  sort: ReservationListSortDTO = new ReservationListSortDTO();
}

export class ReservationListResultDTO extends PaginationResultDTO<ReservationDTO> {
  @IsDefined()
  @IsArray()
  @IsDefined({ each: true })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ReservationDTO)
  @Expose()
  @ApiProperty({ type: ReservationDTO, isArray: true })
  override items: ReservationDTO[];
}
