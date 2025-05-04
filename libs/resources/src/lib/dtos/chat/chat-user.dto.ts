import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class ChatUserDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  chatId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  joinedAt: Date;
}
