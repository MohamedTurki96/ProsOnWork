import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty } from "class-validator"

export class RequestPasswordResetDTO {
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  @ApiProperty()
  email: string
}
