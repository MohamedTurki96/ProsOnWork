import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MediaGetDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;
}
