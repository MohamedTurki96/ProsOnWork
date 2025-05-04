import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import {
  ReclamationCreateDTO,
  ReclamationUpdateDTO,
} from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';

@Injectable()
export class ReclamationService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
  ) {}

  async get(id: number) {
    const result = await this.client.reclamation.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException('Reclamation not found');
    }

    return result.toDTO();
  }

  async create(dto: ReclamationCreateDTO) {
    return await this.client.reclamation.create({
      data: dto,
    });
  }

  async update(dto: ReclamationUpdateDTO) {
    return this.client.reclamation.update({
      where: { id: dto.id },
      data: {
        status: dto.status,
      },
    });
  }
}
