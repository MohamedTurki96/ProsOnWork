import { DynamicModule } from "@nestjs/common"
import { TerminusModule } from "@nestjs/terminus"

import { HEALTH_MODULE_OPTIONS } from "./constants"
import { HealthController } from "./controller"
import { NatsHealthIndicator } from "./nats"

export interface HealthModuleOptions {
  database?: { enabled: boolean }
  nats?: { enabled: boolean }
}

export class HealthModule {
  public static register(options?: HealthModuleOptions): DynamicModule {
    return {
      module: HealthModule,
      imports: [
        TerminusModule
      ],
      providers: [
        { provide: HEALTH_MODULE_OPTIONS, useValue: options },
        NatsHealthIndicator,
      ],
      controllers: [HealthController],
    }
  }
}
