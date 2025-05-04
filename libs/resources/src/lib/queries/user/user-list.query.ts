import { IQuery, SerializeableQuery } from "@pros-on-work/utils";

import { UserListDTO } from "../../dtos/user/user-list.dto";

@SerializeableQuery({ resource: "user", action: "list" })
export class UserListQuery implements IQuery<UserListDTO> {
  constructor(readonly payload: UserListDTO) {}
}
