import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class UserGetDTO {
  @ValidateIf((o: UserGetDTO) => !o.email)
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  id?: number;

  @ValidateIf((o: UserGetDTO) => !o.id)
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  @ApiPropertyOptional()
  email?: string;
}
