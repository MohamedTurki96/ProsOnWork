import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { IsGeoLocation } from '../../validators/isGeoLocation';

export class UserUpdateDTO {
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
}

export class UserUpdateCommandDTO extends UserUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;
}
