import { ApiPropertyOptional } from '@nestjs/swagger';
import { IEvent, SerializeableEvent } from '@pros-on-work/utils';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserGetDTO } from '../../dtos/user/user-get.dto';


export class ResetPasswordRequestedDTO extends UserGetDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  resetToken: string;
}

@SerializeableEvent({ resource: 'user', action: 'password-reset-requested' })
export class ResetPasswordRequestedEvent implements IEvent<ResetPasswordRequestedDTO> {
  constructor(readonly payload: ResetPasswordRequestedDTO) {}
}
