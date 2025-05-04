import { Module } from '@nestjs/common';
import { DatabaseModule, ProsOnWorkCoreModule } from '@pros-on-work/core';

import { createPrismaClient } from './db';
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
  ],
  providers: [
    NotificationService
  ],
  controllers: [
    NotificationController
  ],
})
export class UserServiceModule {}
