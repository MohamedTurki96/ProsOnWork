import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { IsGeoLocation } from '../../validators/isGeoLocation';

export class ShopGetDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;
}

export class ShopDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsGeoLocation()
  @ApiPropertyOptional()
  @Expose()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  ownerId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class ShopCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsGeoLocation()
  @ApiPropertyOptional()
  @Expose()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  ownerId: number;
}

export class ShopUpdateDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Expose()
  name?: string;

  @IsOptional()
  @IsGeoLocation()
  @ApiPropertyOptional()
  @Expose()
  address?: string;
}

export class ShopUpdateCommandDTO extends ShopUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;
}
