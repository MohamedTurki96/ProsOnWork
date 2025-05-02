import { IEvent, SerializeableEvent } from "@pros-on-work/utils";

import { UserGetDTO } from "../../dtos/user/user-get.dto";

@SerializeableEvent({ resource: "user", action: "password-changed" })
export class UserPasswordChangedEvent implements IEvent<UserGetDTO> {
  constructor(readonly payload: UserGetDTO) {}
}
