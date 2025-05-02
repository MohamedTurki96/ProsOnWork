import { DynamicModule, Module } from "@nestjs/common"
import * as promClient from "prom-client"

import { MetricsController } from "./controller"
import { PrometheusOptions } from "./interfaces"

@Module({})
export class MetricsModule {
  public static register(options?: PrometheusOptions): DynamicModule {
    const opts: PrometheusOptions = {
      defaultMetrics: {
        enabled: true,
        config: {},
        ...options?.defaultMetrics,
      },

      defaultLabels: {
        appName: process.env["APP_NAME"],
        appVersion: process.env["APP_VERSION"],
        ...options?.defaultLabels,
      },
    }

    if (opts.defaultMetrics!.enabled) {
      promClient.collectDefaultMetrics(opts.defaultMetrics!.config)
    }

    promClient.register.setDefaultLabels(opts.defaultLabels!)

    return {
      module: MetricsModule,
      controllers: [MetricsController],
    }
  }
}
