import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class FeedbackDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  productId: number;

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  parentId?: number;

  @ValidateIf((o) => !o.rating || o.parentId)
  @IsNotEmpty()
  @IsNotEmpty()
  @Expose()
  @ApiPropertyOptional()
  comment?: string;

  @ValidateIf((o) => !o.comment && !o.parentId)
  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  rating?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeedbackDTO)
  @ApiPropertyOptional({ type: [FeedbackDTO] })
  @Expose()
  replies?: FeedbackDTO[];

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class FeedbackCreateDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  productId: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  parentId?: number;

  @ValidateIf((o) => !o.comment && !o.parentId)
  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  rating: number;

  @ValidateIf((o) => !o.rating || o.parentId)
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  @Expose()
  comment?: string;
}
