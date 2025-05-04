import { ApiProperty } from '@nestjs/swagger';
import { ProsOnWorkHttpError } from '@pros-on-work/utils';
import { Expose, Type } from 'class-transformer';
import { IsDateString, IsDefined, IsNumber, IsString } from 'class-validator';

export class ErrorDTO implements ProsOnWorkHttpError {
  @IsNumber()
  @IsDefined()
  @Type(() => Number)
  @Expose()
  @ApiProperty({ type: Number })
  statusCode: number;
  @IsDateString()
  @IsDefined()
  @Expose()
  @ApiProperty()
  timestamp: string;
  @IsString()
  @IsDefined()
  @Expose()
  @ApiProperty()
  path: string;
  @IsString()
  @IsDefined()
  @Expose()
  @ApiProperty()
  message: string;
}
