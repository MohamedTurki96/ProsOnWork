import { Provider } from "@nestjs/common"
import * as client from "prom-client"

import { getMetricsToken } from "./utils"

/**
 * @public
 */
export function makeHistogramProvider(
  options: client.HistogramConfiguration<string>
): Provider {
  return {
    provide: getMetricsToken(options.name),
    useFactory(): client.Metric<string> {
      const existingMetric = client.register.getSingleMetric(options.name)

      if (existingMetric) {
        return existingMetric
      }

      return new client.Histogram(
        options as client.HistogramConfiguration<string>
      )
    },
  }
}
