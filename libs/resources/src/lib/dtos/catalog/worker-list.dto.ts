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

import { WorkerDTO } from './worker.dto';

export class WorkerListWhereDTO {
  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  phone?: string;
}

export enum WorkerListSortProperty {
  CreatedAt = 'createdAt',
}

export class WorkerListSortDTO {
  @IsDefined()
  @IsEnum(WorkerListSortProperty)
  @Expose()
  @ApiPropertyOptional({
    enum: WorkerListSortProperty,
    enumName: 'WorkerListSortProperty',
    default: WorkerListSortProperty.CreatedAt,
  })
  property: WorkerListSortProperty = WorkerListSortProperty.CreatedAt;

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

export class WorkerListDTO extends PaginationDTO {
  @IsOptional()
  @IsObject()
  @Type(() => WorkerListWhereDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: WorkerListWhereDTO })
  where?: WorkerListWhereDTO;

  @IsDefined()
  @Type(() => WorkerListSortDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: WorkerListSortDTO })
  sort: WorkerListSortDTO = new WorkerListSortDTO();
}

export class WorkerListResultDTO extends PaginationResultDTO<WorkerDTO> {
  @IsDefined()
  @IsArray()
  @IsDefined({ each: true })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => WorkerDTO)
  @Expose()
  @ApiProperty({ type: WorkerDTO, isArray: true })
  items: WorkerDTO[];
}
