import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventHub, PRISMA_CLIENT } from '@pros-on-work/core';
import {
  ProductCreateDTO,
  ProductUpdateDTO,
  ReservationListQuery,
  ReservationListResultDTO,
  ReservationListSortProperty,
} from '@pros-on-work/resources';
import { QuerySortOrder } from '@pros-on-work/utils';

import { ExtendedPrismaClient } from '../db';
import { Prisma } from '../prisma';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
    private readonly eventHub: EventHub,
  ) {}

  async findMany(args: Prisma.ProductFindManyArgs = {}) {
    if (!args.where) {
      args.where = {};
    }

    if (!args.skip) {
      delete args.skip;
    }

    if (!args.take) {
      delete args.take;
    }

    return await this.client.product.findMany(args);
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

  async create(dto: ProductCreateDTO) {
    return this.client.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        priceType: dto.priceType,
        type: dto.type,
        categoryId: dto.categoryId,
        faq: dto.faq,
        includes: dto.includes,
        isActive: true,
        medias: dto.medias,
        shopId: dto.shopId,
      },
    });
  }

  async update(id: number, dto: ProductUpdateDTO) {
    return this.client.product.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        priceType: dto.priceType,
        type: dto.type,
        categoryId: dto.categoryId,
        faq: dto.faq,
        includes: dto.includes,
        isActive: true,
        medias: dto.medias,
      },
    });
  }

  async delete(id: number) {
    const reservations =
      await this.eventHub.sendQuery<ReservationListResultDTO>(
        new ReservationListQuery({
          where: {
            productId: id,
          },
          sort: {
            order: QuerySortOrder.ASC,
            property: ReservationListSortProperty.CreatedAt,
          },
        }),
      );

    if (reservations.items.length) {
      throw new BadRequestException('There is reservation using this product');
    }

    return await this.client.product.delete({
      where: { id },
    });
  }
}
