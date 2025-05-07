import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuerySortOrder } from '@pros-on-work/utils';
import { Expose } from 'class-transformer';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { PaginationDTO, PaginationResultDTO } from '../../pagination.dto';

import { UserDTO, UserRole } from './user.dto';


export class UserListWhereDTO {
  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  @Expose()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  @Expose()
  @ApiPropertyOptional({
    enum: UserRole,
    enumName: 'UserRole',
  })
  role?: UserRole;
}

export enum UserListSortProperty {
  CreatedAt = 'createdAt',
}

export class UserListSortDTO {
  @IsDefined()
  @IsEnum(UserListSortProperty)
  @Expose()
  @ApiPropertyOptional({
    enum: UserListSortProperty,
    enumName: 'UserListSortProperty',
    default: UserListSortProperty.CreatedAt,
  })
  property: UserListSortProperty = UserListSortProperty.CreatedAt;

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

export class UserListDTO extends PaginationDTO {
  @IsOptional()
  @IsObject()
  @Type(() => UserListWhereDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: UserListWhereDTO })
  where?: UserListWhereDTO;

  @IsDefined()
  @Type(() => UserListSortDTO)
  @ValidateNested()
  @Expose()
  @ApiPropertyOptional({ type: UserListSortDTO })
  sort: UserListSortDTO = new UserListSortDTO();
}

export class UserListResultDTO extends PaginationResultDTO<UserDTO> {
  @IsDefined()
  @IsArray()
  @IsDefined({ each: true })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => UserDTO)
  @Expose()
  @ApiProperty({ type: UserDTO, isArray: true })
  override items: UserDTO[];
}
