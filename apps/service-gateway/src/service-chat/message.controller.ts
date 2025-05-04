import {
  Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventHub } from '@pros-on-work/core';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly eventHub: EventHub) {}

}
