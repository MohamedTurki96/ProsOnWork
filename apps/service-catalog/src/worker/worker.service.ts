import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import { WorkerCreateDTO, WorkerUpdateDTO } from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';
import { Prisma } from '../prisma';

@Injectable()
export class WorkerService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
  ) {}

  async findMany(args: Prisma.WorkerFindManyArgs = {}) {
    if (!args.where) {
      args.where = {};
    }

    if (!args.skip) {
      delete args.skip;
    }

    if (!args.take) {
      delete args.take;
    }

    return await this.client.worker.findMany(args);
  }

  async count(args: Prisma.WorkerCountArgs = {}) {
    return await this.client.worker.count(args);
  }

  async get(id: number) {
    const result = await this.client.worker.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException('Worker not found');
    }

    return result.toDTO();
  }

  async create(dto: WorkerCreateDTO) {
    return this.client.worker.create({
      data: {
        name: dto.name,
        shopId: dto.shopId,
        phone: dto.phone,
      },
    });
  }

  async update(id: number, dto: WorkerUpdateDTO) {
    return this.client.worker.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    return await this.client.worker.delete({
      where: { id },
    });
  }
}
