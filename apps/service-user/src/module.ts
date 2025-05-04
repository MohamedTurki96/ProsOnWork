import { Module } from '@nestjs/common';
import { DatabaseModule, ProsOnWorkCoreModule } from '@pros-on-work/core';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { createPrismaClient } from './db';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

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
  providers: [UserService, AuthService],
  controllers: [UserController, AuthController],
})
export class UserServiceModule {}
