import { Controller, Inject } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { PRISMA_CLIENT, QueryPattern } from '@pros-on-work/core';
import {
  PaginationResponse,
  ProductGetDTO,
  ProductGetQuery,
  ProductListDTO,
  ProductListQuery,
} from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';
import { Prisma } from '../prisma';

import { ProductService } from './product.service';

@Controller('Product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
  ) {}

  @QueryPattern(ProductListQuery)
  async listProducts(@Payload('payload') query: ProductListDTO) {
    const where: Prisma.ProductWhereInput = {};

    if (!query.where) {
      query.where = {};
    }

    if (query.where.maxPrice || query.where.minPrice) {
      where.price = {};

      if (query.where.minPrice) {
        where.price.gte = query.where.minPrice;
      }

      if (query.where.maxPrice) {
        where.price.lte = query.where.maxPrice;
      }
    }

    if (query.where.categories?.length) {
      where.categoryId = { in: query.where.categories };
    }

    if (query.where.q?.length) {
      where.name = { contains: query.where.q, mode: 'insensitive' };
    }

    let shopIdsInRadius: number[] | undefined;

    if (
      query.where.latitude !== undefined &&
      query.where.longitude !== undefined
    ) {
      const { latitude: lat, longitude: lon } = query.where;
      const RADIUS_KM = 10;

      // ~0.09° de latitude ≈ 10 km
      const latDelta = RADIUS_KM / 111;
      const lonDelta = RADIUS_KM / (111 * Math.cos((lat * Math.PI) / 180));

      /* a) bounding-box rapide pour limiter les shops candidats            *
       * b) formule de Haversine en SQL pour la distance exacte (<10 km)   */

      shopIdsInRadius = (
        await this.client.$queryRaw<{ id: number }[]>`
          SELECT "id"
          FROM   "Shop"
          WHERE  /* première passe : boîte englobante */
                 (split_part(address, '|', 2))::numeric BETWEEN ${lat - latDelta} AND ${lat + latDelta}
            AND (split_part(address, '|', 1))::numeric BETWEEN ${lon - lonDelta} AND ${lon + lonDelta}
            /* deuxième passe : distance haversine ≤ 10 km */
            AND 6371 *
                  acos(
                    cos(radians(${lat})) *
                    cos(radians((split_part(address, '|', 2))::numeric)) *
                    cos(radians((split_part(address, '|', 1))::numeric) - radians(${lon})) +
                    sin(radians(${lat})) *
                    sin(radians((split_part(address, '|', 2))::numeric))
                  ) <= ${RADIUS_KM}
        `
      ).map((s) => s.id);

      if (shopIdsInRadius?.length) {
        where.shopId = { in: shopIdsInRadius };
      }
    }

    const products = await this.productService.findMany({
      skip: query.skip,
      take: query.take,
      orderBy: query.sort
        ? {
            [query.sort.property]: query.sort.order,
          }
        : undefined,
      where,
    });

    const count = await this.productService.count({ where });

    const dtoItems = products.map((i) => i.toDTO());

    return PaginationResponse(dtoItems, count, query);
  }

  @QueryPattern(ProductGetQuery)
  async getProduct(@Payload('payload') query: ProductGetDTO) {
    return await this.productService.get(query.id);
  }

  /*   @CommandPattern(ProductCreateCommand)
  async handleCreate(@Payload('payload') dto: ProductCreateDTO) {
    const result = await this.productService.create(dto);

    return result.toDTO();
  }

  @CommandPattern(ProductUpdateCommand)
  async handleUpdate(@Payload('payload') dto: ProductUpdateCommandDTO) {
    const result = await this.productService.update(dto.id, dto);

    return result.toDTO();
  } */
}
