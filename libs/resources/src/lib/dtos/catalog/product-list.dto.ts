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
  IsString,
  ValidateNested,
} from 'class-validator';

import { PaginationDTO, PaginationResultDTO } from '../../pagination.dto';

import { ProductDTO } from './product.dto';

export class ProductListWhereDTO {
  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  q?: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  maxPrice?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Number)
  @ApiPropertyOptional({ isArray: true, type: Number })
  @Expose()
  categories?: number[];

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Number)
  @ApiPropertyOptional({ isArray: true, type: Number })
  @Expose()
  rating?: string;
}

export enum ProductListSortProperty {
  CreatedAt = 'createdAt',
}

export class ProductListSortDTO {
  @IsDefined()
  @IsEnum(ProductListSortProperty)
  @Expose()
  @ApiPropertyOptional({
    enum: ProductListSortProperty,
    enumName: 'ProductListSortProperty',
    default: ProductListSortProperty.CreatedAt,
  })
  property: ProductListSortProperty = ProductListSortProperty.CreatedAt;

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

export class ProductListDTO extends PaginationDTO {
  @IsOptional()
  @IsObject()
  @Type(() => ProductListWhereDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: ProductListWhereDTO })
  where?: ProductListWhereDTO;

  @IsDefined()
  @Type(() => ProductListSortDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: ProductListSortDTO })
  sort: ProductListSortDTO = new ProductListSortDTO();
}

export class ProductListResultDTO extends PaginationResultDTO<ProductDTO> {
  @IsDefined()
  @IsArray()
  @IsDefined({ each: true })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  @Expose()
  @ApiProperty({ type: ProductDTO, isArray: true })
  override items: ProductDTO[];
}
