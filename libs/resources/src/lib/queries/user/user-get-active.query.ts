import { IQuery, SerializeableQuery } from "@pros-on-work/utils"

import { UserGetDTO } from "../../dtos/user/user-get.dto";

@SerializeableQuery({ resource: "user", action: "read-active" })
export class UserGetActiveQuery implements IQuery<UserGetDTO> {
  constructor(readonly payload: UserGetDTO) {}
}
