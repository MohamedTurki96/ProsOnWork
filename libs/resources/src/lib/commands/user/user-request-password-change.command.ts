import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { RequestPasswordResetDTO } from "../../dtos/user/request-password-reset.dto";

@SerializeableCommand({ resource: "user", action: "request-password-reset" })
export class UserRequestPasswordResetCommand implements ICommand<RequestPasswordResetDTO> {
  constructor(readonly payload: RequestPasswordResetDTO) {}
}
