import { Module } from '@nestjs/common';
import { DatabaseModule, ProsOnWorkCoreModule } from '@pros-on-work/core';

import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { createPrismaClient } from './db';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';

@Module({
  imports: [
    ProsOnWorkCoreModule.forRoot({
      health: {
        database: { enabled: false },
        nats: { enabled: true },
      },
    }),
    DatabaseModule.forPrisma(createPrismaClient()),
  ],
  providers: [ChatService, MessageService],
  controllers: [ChatController, MessageController],
})
export class UserServiceModule {}
