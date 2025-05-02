import { IEvent, SerializeableEvent } from "@pros-on-work/utils";

import { UserGetDTO } from "../../dtos/user/user-get.dto";

@SerializeableEvent({ resource: "user", action: "updated" })
export class UserUpdatedEvent implements IEvent<UserGetDTO> {
  constructor(readonly payload: UserGetDTO) {}
}
