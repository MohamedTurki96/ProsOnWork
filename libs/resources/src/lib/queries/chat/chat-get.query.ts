import { IQuery, SerializeableQuery } from "@pros-on-work/utils";

import { ChatGetDTO } from "../../dtos/chat/chat.dto";

@SerializeableQuery({ resource: 'chat', action: 'read' })
export class ChatGetQuery implements IQuery<ChatGetDTO> {
  constructor(readonly payload: ChatGetDTO) {}
}