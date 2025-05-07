import { Injectable } from "@nestjs/common"
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from "@nestjs/terminus"
import { connect } from "nats"

import { loadNatsConnectionOptions } from "../nats-transport/nats.config"

@Injectable()
export class NatsHealthIndicator extends HealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const nc = await connect(loadNatsConnectionOptions())
      await nc.close()
      return this.getStatus(key, true)
    } catch (err) {
      throw new HealthCheckError(
        "Unable to connect to NATS server",
        this.getStatus(key, false, {
          message: "Unable to connect to NATS server",
        })
      )
    }
  }
}
