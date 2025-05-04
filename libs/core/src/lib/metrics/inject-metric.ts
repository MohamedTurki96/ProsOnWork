import { Inject } from "@nestjs/common"

import { getMetricsToken } from "./metrics/utils"

export function InjectMetric(
  name: string
): PropertyDecorator & ParameterDecorator {
  const token = getMetricsToken(name)

  return Inject(token)
}
