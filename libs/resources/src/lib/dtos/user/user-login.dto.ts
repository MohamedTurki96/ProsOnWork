import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

import { UserDTO, UserRole } from './user.dto';

export class UserLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  password: string;
}

export class CurrentUserDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  @Expose()
  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  role: string;
}

export class UserLoginResultDTO {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Expose()
  @ApiProperty({ type: UserDTO })
  user: UserDTO;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  token: string;
}
