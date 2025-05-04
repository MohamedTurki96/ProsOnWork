import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class WalletDTO {
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
  @ApiProperty()
  @Expose()
  balance: number;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date;
}
