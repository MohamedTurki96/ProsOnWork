import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { IsGeoLocation } from '../../validators/isGeoLocation';

export const UserRole = {
  Admin: 'admin',
  Client: 'client',
  ServiceProvider: 'serviceProvider',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export class UserDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiPropertyOptional({ type: Date })
  emailVerifiedAt?: Date;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  phone?: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  @Expose()
  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  role: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  avatarId?: string;

  @IsOptional()
  @IsGeoLocation()
  @Expose()
  @ApiProperty()
  address?: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}
