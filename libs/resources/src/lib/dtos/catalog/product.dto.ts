import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { WorkerDTO } from './worker.dto';

export const ProductType = {
  Service: 'service',
  Equipment: 'equipment',
} as const;

export type ProductType = (typeof ProductType)[keyof typeof ProductType];

export const PriceType = {
  Hour: 'hour',
  Package: 'package',
} as const;

export type PriceType = (typeof PriceType)[keyof typeof PriceType];

export class FaqDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Expose()
  question: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Expose()
  answer: string;
}

export class ProductGetDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;
}

export class ProductDTO {
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
  @IsString()
  @ApiProperty()
  @Expose()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  @Expose()
  isActive: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => String)
  @ApiPropertyOptional({ isArray: true, type: String })
  @Expose()
  includes?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Number)
  @ApiPropertyOptional({ isArray: true, type: Number })
  @Expose()
  medias?: number[];

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => FaqDTO)
  @ApiPropertyOptional({ isArray: true, type: FaqDTO })
  @Expose()
  faq?: FaqDTO[];

  @IsNotEmpty()
  @IsEnum(ProductType)
  @Expose()
  @ApiProperty({ enum: ProductType, enumName: 'ProductType' })
  type: ProductType;

  @IsNotEmpty()
  @IsEnum(PriceType)
  @Expose()
  @ApiProperty({ enum: PriceType, enumName: 'PriceType' })
  priceType: PriceType;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  shopId: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => WorkerDTO)
  @ApiProperty({ isArray: true, type: WorkerDTO })
  @Expose()
  workers: WorkerDTO[];

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class ProductCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Expose()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  @Expose()
  isActive: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => String)
  @ApiPropertyOptional({ isArray: true, type: String })
  @Expose()
  includes?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Number)
  @ApiPropertyOptional({ isArray: true, type: Number })
  @Expose()
  medias?: number[];

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => FaqDTO)
  @ApiPropertyOptional({ isArray: true, type: FaqDTO })
  @Expose()
  faq?: FaqDTO[];

  @IsNotEmpty()
  @IsEnum(ProductType)
  @Expose()
  @ApiProperty({ enum: ProductType, enumName: 'ProductType' })
  type: ProductType;

  @IsNotEmpty()
  @IsEnum(PriceType)
  @Expose()
  @ApiProperty({ enum: PriceType, enumName: 'PriceType' })
  priceType: PriceType;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  shopId: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Number)
  @ApiProperty({ isArray: true, type: Number })
  @Expose()
  workers: number[];
}

export class ProductUpdateDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Expose()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Expose()
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  price?: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  @Expose()
  isActive?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => String)
  @ApiPropertyOptional({ isArray: true, type: String })
  @Expose()
  includes?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => FaqDTO)
  @ApiPropertyOptional({ isArray: true, type: FaqDTO })
  @Expose()
  faq?: FaqDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Number)
  @ApiPropertyOptional({ isArray: true, type: Number })
  @Expose()
  medias?: number[];

  @IsOptional()
  @IsEnum(ProductType)
  @Expose()
  @ApiPropertyOptional({ enum: ProductType, enumName: 'ProductType' })
  type?: ProductType;

  @IsOptional()
  @IsEnum(PriceType)
  @Expose()
  @ApiPropertyOptional({ enum: PriceType, enumName: 'PriceType' })
  priceType?: PriceType;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  categoryId?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => Number)
  @ApiPropertyOptional({ isArray: true, type: Number })
  @Expose()
  workers?: number[];
}

export class ProductUpdateCommandDTO extends ProductUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;
}
