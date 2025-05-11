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
  IsString,
  ValidateNested,
} from 'class-validator';

import { PaginationDTO, PaginationResultDTO } from '../../pagination.dto';

import { ReclamationDTO } from './reclamation.dto';

export class ReclamationListWhereDTO {
  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  comment?: string;
}

export enum ReclamationListSortProperty {
  CreatedAt = 'createdAt',
}

export class ReclamationListSortDTO {
  @IsDefined()
  @IsEnum(ReclamationListSortProperty)
  @Expose()
  @ApiPropertyOptional({
    enum: ReclamationListSortProperty,
    enumName: 'ReclamationListSortProperty',
    default: ReclamationListSortProperty.CreatedAt,
  })
  property: ReclamationListSortProperty = ReclamationListSortProperty.CreatedAt;

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

export class ReclamationListDTO extends PaginationDTO {
  @IsOptional()
  @IsObject()
  @Type(() => ReclamationListWhereDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: ReclamationListWhereDTO })
  where?: ReclamationListWhereDTO;

  @IsDefined()
  @Type(() => ReclamationListSortDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: ReclamationListSortDTO })
  sort: ReclamationListSortDTO = new ReclamationListSortDTO();
}

export class ReclamationListResultDTO extends PaginationResultDTO<ReclamationDTO> {
  @IsDefined()
  @IsArray()
  @IsDefined({ each: true })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ReclamationDTO)
  @Expose()
  @ApiProperty({ type: ReclamationDTO, isArray: true })
  override items: ReclamationDTO[];
}
