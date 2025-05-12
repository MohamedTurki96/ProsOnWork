import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import { ShopCreateDTO, ShopUpdateDTO } from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';
import { Prisma } from '../prisma';

@Injectable()
export class ShopService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
  ) {}

  async findMany(args: Prisma.ShopFindManyArgs = {}) {
    if (!args.where) {
      args.where = {};
    }

    if (!args.skip) {
      delete args.skip;
    }

    if (!args.take) {
      delete args.take;
    }

    return await this.client.shop.findMany(args);
  }

  async count(args: Prisma.ShopCountArgs = {}) {
    return await this.client.shop.count(args);
  }

  async get(id: number) {
    const result = await this.client.shop.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException('Shop not found');
    }

    return result.toDTO();
  }

  async create(dto: ShopCreateDTO) {
    return this.client.shop.create({
      data: dto,
    });
  }

  async update(id: number, dto: ShopUpdateDTO) {
    return this.client.shop.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    const products = await this.client.product.exists({
      shopId: id,
    });

    if (products) {
      throw new BadRequestException('There is products using this shop');
    }

    return await this.client.shop.delete({
      where: { id },
    });
  }
}
