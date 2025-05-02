import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class UserCreateDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  @Expose()
  @ApiProperty()
  password: string

  @IsOptional()
  @IsString(null)
  @Expose()
  @ApiPropertyOptional()
  phone?: string

  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  isClient?: string
}
