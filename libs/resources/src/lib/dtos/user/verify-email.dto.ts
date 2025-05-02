import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class VerifyEmailDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    example: 'ef39b48a-2e45-4c66-9b11-0e1f2aab4e9a',
    description: 'Email verification token',
  })
  token: string
}
