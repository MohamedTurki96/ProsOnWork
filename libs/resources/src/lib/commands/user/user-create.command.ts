import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { UserCreateDTO } from "../../dtos/user/user-create.dto";

@SerializeableCommand({ resource: "user", action: "create" })
export class UserCreateCommand implements ICommand<UserCreateDTO> {
  constructor(readonly payload: UserCreateDTO) {}
}
