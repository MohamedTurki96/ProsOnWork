import { ApiPropertyOptional } from '@nestjs/swagger';
import { IEvent, SerializeableEvent } from '@pros-on-work/utils';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserGetDTO } from '../../dtos/user/user-get.dto';


export class UserCreatedDTO extends UserGetDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  verificationToken: string;
}

@SerializeableEvent({ resource: 'user', action: 'created' })
export class UserCreatedEvent implements IEvent<UserCreatedDTO> {
  constructor(readonly payload: UserCreatedDTO) {}
}
