import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

import { UserPlan } from './user.dto';

export class UserCreateDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  @Expose()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  phone?: string;

  @ValidateIf((o: UserCreateDTO) => !o.isClient)
  @IsNotEmpty()
  @IsEnum(UserPlan)
  @Expose()
  @ApiPropertyOptional({ enum: UserPlan, enumName: 'UserPlan' })
  plan?: UserPlan;

  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  isClient?: boolean;
}
