import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventHub, PRISMA_CLIENT } from '@pros-on-work/core';

import { ExtendedPrismaClient } from '../db';
import { Prisma } from '../prisma';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
    private readonly evetnHub: EventHub
  ) {}

  async findMany(args: Prisma.ProductFindManyArgs = {}) {
    if (!args.where) {
      args.where = {};
    }

    return await this.client.product.findMany({
      ...args,
    });
  }

  async count(args: Prisma.ProductCountArgs = {}) {
    return await this.client.product.count(args);
  }

  async get(id: number) {
    const result = await this.client.product.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException('Product not found');
    }

    return result.toDTO();
  }

 /*  async create(dto: ProductCreateDTO) {
    const workersId = dto.workers;
    


    return this.client.product.create({
      data: dto,
    });
  }

  async update(id: number, dto: ProductUpdateDTO) {
    return this.client.product.update({
      where: { id },
      data: dto,
    });
  } */
}
