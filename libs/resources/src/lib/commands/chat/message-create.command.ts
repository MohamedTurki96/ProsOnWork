import { ICommand, SerializeableCommand } from '@pros-on-work/utils'

import { MessageCreateDTO } from '../../dtos/chat/message.dto'

@SerializeableCommand({ resource: 'message', action: 'create' })
export class MessageCreateCommand implements ICommand<MessageCreateDTO> {
  constructor(readonly payload: MessageCreateDTO) {}
}