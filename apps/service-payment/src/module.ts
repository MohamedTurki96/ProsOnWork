import { Module } from '@nestjs/common';
import { DatabaseModule, ProsOnWorkCoreModule } from '@pros-on-work/core';

import { createPrismaClient } from './db';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';

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
  providers: [PaymentService, WalletService],
  controllers: [PaymentController, WalletController],
})
export class UserServiceModule {}
