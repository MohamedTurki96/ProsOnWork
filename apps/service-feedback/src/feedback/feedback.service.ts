import { Inject, Injectable } from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import { FeedbackCreateDTO } from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';

@Injectable()
export class FeedbackService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
  ) {}

  async get(productId: number) {
    const result = await this.client.feedback.findMany({ where: { productId } });

    return result.map((x) => x.toDTO());
  }

  async create(dto: FeedbackCreateDTO) {
    return this.client.feedback.create({
      data: dto,
    });
  }
}
