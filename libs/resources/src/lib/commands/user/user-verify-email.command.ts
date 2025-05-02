import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { VerifyEmailDTO } from "../../dtos/user/verify-email.dto";

@SerializeableCommand({ resource: "user", action: "verify-email" })
export class UserVerifyEmailCommand implements ICommand<VerifyEmailDTO> {
  constructor(readonly payload: VerifyEmailDTO) {}
}
