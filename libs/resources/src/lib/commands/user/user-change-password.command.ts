import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { ChangePasswordCommandDTO } from "../../dtos/user/change-password.dto";


@SerializeableCommand({ resource: "user", action: "change-password" })
export class UserChangePasswordCommand implements ICommand<ChangePasswordCommandDTO> {
  constructor(readonly payload: ChangePasswordCommandDTO) {}
}
