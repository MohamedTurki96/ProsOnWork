import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { UserLoginDTO } from "../../dtos/user/user-login.dto";

@SerializeableCommand({ resource: "user", action: "login" })
export class UserLoginCommand implements ICommand<UserLoginDTO> {
  constructor(readonly payload: UserLoginDTO) {}
}
