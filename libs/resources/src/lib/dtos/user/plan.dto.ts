import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { UserPlan } from './user.dto';

export class UserPlans {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  [UserPlan.Basic]: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  [UserPlan.Business]: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  [UserPlan.Premium]: number;
}
