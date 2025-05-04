import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, QueryPattern } from '@pros-on-work/core';
import {
  FeedbackCreateCommand,
  FeedbackCreateDTO,
  FeedbackGetDTO,
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

  @CommandPattern(FeedbackCreateCommand)
  async handleCreate(@Payload('payload') dto: FeedbackCreateDTO) {
    const result = await this.feedbackService.create(dto);

    return result.toDTO();
  }
}
