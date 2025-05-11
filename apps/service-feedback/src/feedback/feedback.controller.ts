import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, QueryPattern } from '@pros-on-work/core';
import {
  FeedbackCreateCommand,
  FeedbackCreateDTO,
  FeedbackGetDTO,
  FeedbackGetForDTO,
  FeedbackGetForQuery,
  FeedbackGetQuery,
} from '@pros-on-work/resources';

import { FeedbackService } from './feedback.service';

@Controller('Feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @QueryPattern(FeedbackGetQuery)
  async getFeedback(@Payload('payload') query: FeedbackGetDTO) {
    return await this.feedbackService.get(query.productId);
  }

  @QueryPattern(FeedbackGetForQuery)
  async getFeedbackFor(@Payload('payload') query: FeedbackGetForDTO) {
    return await this.feedbackService.getFor(query);
  }

  @CommandPattern(FeedbackCreateCommand)
  async handleCreate(@Payload('payload') dto: FeedbackCreateDTO) {
    const result = await this.feedbackService.create(dto);

    return result.toDTO();
  }
}
