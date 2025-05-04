import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventHub } from '@pros-on-work/core';

@ApiTags('Chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly eventHub: EventHub) {}
}
