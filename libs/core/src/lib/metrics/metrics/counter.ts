import { Provider } from "@nestjs/common"
import * as client from "prom-client"

import { getMetricsToken } from "./utils"

/**
 * @public
 */
export function makeCounterProvider(
  options: client.CounterConfiguration<string>
): Provider {
  return {
    provide: getMetricsToken(options.name),
    useFactory(): client.Metric<string> {
      const existingMetric = client.register.getSingleMetric(options.name)

      if (existingMetric) {
        return existingMetric
      }

      return new client.Counter(options as client.CounterConfiguration<string>)
    },
  }
}
