import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FeedbackGetForDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  userId: number;
}
