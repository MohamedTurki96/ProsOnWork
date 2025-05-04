import { Module } from '@nestjs/common';
import { DatabaseModule, ProsOnWorkCoreModule } from '@pros-on-work/core';

import { createPrismaClient } from './db';
import { ReservationController } from './reservation/reservation.controller';
import { ReservationService } from './reservation/reservation.service';

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
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class UserServiceModule {}
