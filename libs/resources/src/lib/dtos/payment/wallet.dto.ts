import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';

export class WalletGetDTO {
  @ValidateIf((o: WalletGetDTO) => !o.userId)
  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  id?: number;

  @ValidateIf((o: WalletGetDTO) => !o.id)
  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  userId?: number;
}

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
