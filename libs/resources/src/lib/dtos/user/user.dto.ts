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
  ValidateIf,
} from 'class-validator';

import { IsGeoLocation } from '../../validators/isGeoLocation';

export const UserRole = {
  Admin: 'admin',
  Client: 'client',
  ServiceProvider: 'serviceProvider',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserPlan = {
  Basic: 'basic',
  Business: 'business',
  Premium: 'premium',
} as const;

export type UserPlan = (typeof UserPlan)[keyof typeof UserPlan];

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
  role: UserRole;

  @ValidateIf((o: UserDTO) => o.role == UserRole.ServiceProvider)
  @IsNotEmpty()
  @IsEnum(UserPlan)
  @Expose()
  @ApiPropertyOptional({ enum: UserPlan, enumName: 'UserPlan' })
  plan?: UserPlan;

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  avatarId?: number;

  @IsOptional()
  @IsGeoLocation()
  @Expose()
  @ApiPropertyOptional()
  address?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}
