import { Module } from '@nestjs/common';
import { DatabaseModule, EmailModule, ProsOnWorkCoreModule } from '@pros-on-work/core';

import { createPrismaClient } from './db';
import { EmailController } from './email/email.controller';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';

@Module({
  imports: [
    ProsOnWorkCoreModule.forRoot({
      health: {
        database: { enabled: false },
        nats: { enabled: true },
      },
    }),
    DatabaseModule.forPrisma(createPrismaClient()),
    EmailModule
  ],
  providers: [
    NotificationService
  ],
  controllers: [
    EmailController,
    NotificationController
  ],
})
export class UserServiceModule {}
