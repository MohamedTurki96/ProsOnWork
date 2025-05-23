import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import { CategoryCreateDTO, CategoryUpdateDTO } from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';
import { Prisma } from '../prisma';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
  ) {}

  async findMany(args: Prisma.CategoryFindManyArgs = {}) {
    if (!args.where) {
      args.where = {};
    }

    if (!args.skip) {
      delete args.skip;
    }

    if (!args.take) {
      delete args.take;
    }

    return await this.client.category.findMany(args);
  }

  async count(args: Prisma.CategoryCountArgs = {}) {
    return await this.client.category.count(args);
  }

  async get(id: number) {
    const result = await this.client.category.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException('Category not found');
    }

    return result.toDTO();
  }

  async create(dto: CategoryCreateDTO) {
    return this.client.category.create({
      data: dto,
    });
  }

  async update(id: number, dto: CategoryUpdateDTO) {
    return this.client.category.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    const products = await this.client.product.exists({
      categoryId: id,
    });

    if (products) {
      throw new BadRequestException('There is products using this category');
    }

    return await this.client.category.delete({
      where: { id },
    });
  }
}
