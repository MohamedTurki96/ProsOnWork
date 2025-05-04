import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common"
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { EventHub } from "@pros-on-work/core"
import { FeedbackCreateCommand, FeedbackCreateDTO, FeedbackDTO, FeedbackGetQuery } from "@pros-on-work/resources"

import { Public } from "../decorators/public.decorator"

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly eventHub: EventHub) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: FeedbackCreateDTO })
  @ApiResponse({ status: HttpStatus.CREATED, type: FeedbackDTO })
  async create(@Body() dto: FeedbackCreateDTO) {
    return this.eventHub.sendCommand(new FeedbackCreateCommand(dto))
  }

  @Get('product/:productId')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'productId', type: Number })
  @ApiResponse({ status: HttpStatus.OK, type: [FeedbackDTO] })
  async listByProduct(@Param('productId') productId: number) {
    return this.eventHub.sendQuery(new FeedbackGetQuery({ productId }))
  }
}
