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

import { WalletDTO } from './wallet.dto';

export class WalletListWhereDTO {
  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  userId?: number;
}

export enum WalletListSortProperty {
  CreatedAt = 'createdAt',
}

export class WalletListSortDTO {
  @IsDefined()
  @IsEnum(WalletListSortProperty)
  @Expose()
  @ApiPropertyOptional({
    enum: WalletListSortProperty,
    enumName: 'WalletListSortProperty',
    default: WalletListSortProperty.CreatedAt,
  })
  property: WalletListSortProperty = WalletListSortProperty.CreatedAt;

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

export class WalletListDTO extends PaginationDTO {
  @IsOptional()
  @IsObject()
  @Type(() => WalletListWhereDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: WalletListWhereDTO })
  where?: WalletListWhereDTO;

  @IsDefined()
  @Type(() => WalletListSortDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: WalletListSortDTO })
  sort: WalletListSortDTO = new WalletListSortDTO();
}

export class WalletListResultDTO extends PaginationResultDTO<WalletDTO> {
  @IsDefined()
  @IsArray()
  @IsDefined({ each: true })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => WalletDTO)
  @Expose()
  @ApiProperty({ type: WalletDTO, isArray: true })
  override items: WalletDTO[];
}
