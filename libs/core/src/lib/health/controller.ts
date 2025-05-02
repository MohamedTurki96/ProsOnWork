import { Controller, Get, Inject, Optional } from "@nestjs/common"
import { ApiExcludeController } from "@nestjs/swagger"
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorFunction,
  PrismaHealthIndicator,
} from "@nestjs/terminus"

import { BasePrismaClient, PRISMA_CLIENT } from "../database"

import { HEALTH_MODULE_OPTIONS } from "./constants"
import { HealthModuleOptions } from "./module"
import { NatsHealthIndicator } from "./nats"

@ApiExcludeController()
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private nats: NatsHealthIndicator,
    private prisma: PrismaHealthIndicator,
    @Inject(HEALTH_MODULE_OPTIONS)
    private options: HealthModuleOptions,
    @Optional()
    @Inject(PRISMA_CLIENT)
    private prismaClient?: BasePrismaClient
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const indicators: HealthIndicatorFunction[] = []
    
    if (this.options?.database?.enabled && this.prismaClient) {
      indicators.push(() =>
        this.prisma.pingCheck("database", this.prismaClient!, { timeout: 1000 })
      )
    }

    if (this.options?.nats?.enabled) {
      indicators.push(() => this.nats.isHealthy("nats"))
    }

    return this.health.check(indicators)
  }
}
