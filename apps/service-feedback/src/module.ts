import { Module } from "@nestjs/common"
import { DatabaseModule,  ProsOnWorkCoreModule } from "@pros-on-work/core"

import { createPrismaClient } from "./db"
import { FeedbackController } from "./feedback/feedback.controller"
import { FeedbackService } from "./feedback/feedback.service"
import { ReclamationController } from "./reclamation/reclamation.controller"
import { ReclamationService } from "./reclamation/reclamation.service"


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
    FeedbackService,
    ReclamationService
  ],
  controllers: [
    FeedbackController,
    ReclamationController
  ],
})
export class UserServiceModule {}
