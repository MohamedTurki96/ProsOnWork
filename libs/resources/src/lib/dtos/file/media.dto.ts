import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MediaDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Expose()
  filename: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Expose()
  url: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Expose()
  mimeType: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  size: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}
