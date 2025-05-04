import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ReservationGetDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;
}
