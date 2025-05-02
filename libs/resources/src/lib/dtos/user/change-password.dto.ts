import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  @Expose()
  @ApiProperty()
  newPassword: string;
}

export class ChangePasswordCommandDTO extends ChangePasswordDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;
}
