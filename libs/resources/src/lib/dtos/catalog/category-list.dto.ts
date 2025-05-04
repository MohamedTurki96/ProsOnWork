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

import { CategoryDTO } from './category.dto';


export class CategoryListWhereDTO {
  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  name?: string;
}

export enum CategoryListSortProperty {
  CreatedAt = 'createdAt',
}

export class CategoryListSortDTO {
  @IsDefined()
  @IsEnum(CategoryListSortProperty)
  @Expose()
  @ApiPropertyOptional({
    enum: CategoryListSortProperty,
    enumName: 'CategoryListSortProperty',
    default: CategoryListSortProperty.CreatedAt,
  })
  property: CategoryListSortProperty = CategoryListSortProperty.CreatedAt;

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

export class CategoryListDTO extends PaginationDTO {
  @IsOptional()
  @IsObject()
  @Type(() => CategoryListWhereDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: CategoryListWhereDTO })
  where?: CategoryListWhereDTO;

  @IsDefined()
  @Type(() => CategoryListSortDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: CategoryListSortDTO })
  sort: CategoryListSortDTO = new CategoryListSortDTO();
}

export class CategoryListResultDTO extends PaginationResultDTO<CategoryDTO> {
  @IsDefined()
  @IsArray()
  @IsDefined({ each: true })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CategoryDTO)
  @Expose()
  @ApiProperty({ type: CategoryDTO, isArray: true })
  items: CategoryDTO[];
}
