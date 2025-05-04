import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { UserUpdateCommandDTO } from "../../dtos/user/user-update.dto";


@SerializeableCommand({ resource: 'user', action: 'update' })
export class UserUpdateCommand implements ICommand<UserUpdateCommandDTO> {
  constructor(readonly payload: UserUpdateCommandDTO) {}
}
