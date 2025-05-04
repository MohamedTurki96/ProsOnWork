import {
  DynamicModule,
  Inject,
  Module,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common"

import { InjectableLogger } from "../logger/pino"

import { PRISMA_CLIENT } from "./constants"
import { BasePrismaClient } from "./prisma"

@Module({})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
  static forPrisma(client: Omit<BasePrismaClient, "$on">): DynamicModule {
    return {
      module: DatabaseModule,
      global: true,
      providers: [{ provide: PRISMA_CLIENT, useFactory: () => client }],
      exports: [PRISMA_CLIENT],
    }
  }

  constructor(
    @Inject(PRISMA_CLIENT) readonly client: BasePrismaClient,
    private logger: InjectableLogger
  ) {}

  async onModuleInit() {
    await this.client.$connect()
    this.logger.debug("Connected to database")
  }

  async onModuleDestroy() {
    await this.client.$disconnect()
    this.logger.warn("Disconnected from database")
  }
}
