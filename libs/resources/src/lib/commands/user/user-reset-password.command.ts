import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { ResetPasswordDTO } from "../../dtos/user/reset-password.dto";

@SerializeableCommand({ resource: "user", action: "reset-password" })
export class UserResetPasswordCommand implements ICommand<ResetPasswordDTO> {
  constructor(readonly payload: ResetPasswordDTO) {}
}
