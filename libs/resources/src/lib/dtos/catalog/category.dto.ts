import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CategoryGetDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;
}

export class CategoryDTO {
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

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  iconId?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  imageId?: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class CategoryCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Expose()
  name: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  iconId?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  imageId?: number;
}

export class CategoryUpdateDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Expose()
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  iconId?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  imageId?: number;
}

export class CategoryUpdateCommandDTO extends CategoryUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;
}