import { Module } from "@nestjs/common"
import { /* DatabaseModule, */ ProsOnWorkCoreModule } from "@pros-on-work/core"

import { TestController } from "./controller/user.controller"
//import { createPrismaClient } from "./db"


@Module({
  imports: [
    ProsOnWorkCoreModule.forRoot({
      health: {
        database: { enabled: false },
        nats: { enabled: true },
      },
    }),
    //DatabaseModule.forPrisma(createPrismaClient()),
  ],
  providers: [],
  controllers: [
    TestController
  ],
})
export class UserServiceModule {}
