import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class WorkerGetDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;
}

export class WorkerDTO {
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
  @IsString()
  @ApiPropertyOptional()
  @Expose()
  phone?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  shopId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class WorkerCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Expose()
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Expose()
  phone?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  shopId: number;
}

export class WorkerUpdateDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Expose()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Expose()
  phone?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  shopId?: number;
}

export class WorkerUpdateCommandDTO extends WorkerUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;
}