import { Inject, Injectable } from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import { FeedbackCreateDTO, FeedbackGetForDTO, FeedbackGetForProductResultDTO } from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';

@Injectable()
export class FeedbackService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
  ) {}

  async get(productId: number): Promise<FeedbackGetForProductResultDTO> {
    const result = await this.client.feedback.findMany({
      where: { productId },
    });

    return {items: result.map((x) => x.toDTO())};
  }

  async getFor(query: FeedbackGetForDTO) {
    const result = await this.client.feedback.findMany({
      where: { productId: query.productId, userId: query.userId },
    });

    if (!result.length) {
      return null
    }

    return result[0].toDTO();
  }

  async create(dto: FeedbackCreateDTO) {
    return this.client.feedback.create({
      data: dto,
    });
  }
}
