import { Controller, Get, Res } from "@nestjs/common"
import { ApiExcludeController } from "@nestjs/swagger"
import type { Response } from "express"
import * as client from "prom-client"

@ApiExcludeController()
@Controller("/metrics")
export class MetricsController {
  @Get()
  async index(@Res({ passthrough: true }) response: Response): Promise<string> {
    response.header("Content-Type", client.register.contentType)
    return client.register.metrics()
  }
}
