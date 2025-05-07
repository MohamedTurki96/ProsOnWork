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

import { ShopDTO } from './shop.dto';


export class ShopListWhereDTO {
  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  name?: string;
}

export enum ShopListSortProperty {
  CreatedAt = 'createdAt',
}

export class ShopListSortDTO {
  @IsDefined()
  @IsEnum(ShopListSortProperty)
  @Expose()
  @ApiPropertyOptional({
    enum: ShopListSortProperty,
    enumName: 'ShopListSortProperty',
    default: ShopListSortProperty.CreatedAt,
  })
  property: ShopListSortProperty = ShopListSortProperty.CreatedAt;

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

export class ShopListDTO extends PaginationDTO {
  @IsOptional()
  @IsObject()
  @Type(() => ShopListWhereDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: ShopListWhereDTO })
  where?: ShopListWhereDTO;

  @IsDefined()
  @Type(() => ShopListSortDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: ShopListSortDTO })
  sort: ShopListSortDTO = new ShopListSortDTO();
}

export class ShopListResultDTO extends PaginationResultDTO<ShopDTO> {
  @IsDefined()
  @IsArray()
  @IsDefined({ each: true })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ShopDTO)
  @Expose()
  @ApiProperty({ type: ShopDTO, isArray: true })
  override items: ShopDTO[];
}
