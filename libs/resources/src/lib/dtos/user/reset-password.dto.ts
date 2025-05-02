import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  token: string

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  @Expose()
  @ApiProperty()
  newPassword: string
}
