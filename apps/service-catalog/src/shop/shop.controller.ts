import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, QueryPattern } from '@pros-on-work/core';
import {
  PaginationResponse,
  ShopCreateCommand,
  ShopCreateDTO,
  ShopGetDTO,
  ShopGetQuery,
  ShopListDTO,
  ShopListQuery,
  ShopUpdateCommand,
  ShopUpdateCommandDTO,
} from '@pros-on-work/resources';

import { ShopService } from './shop.service';

@Controller('Shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @QueryPattern(ShopListQuery)
  async listShops(@Payload('payload') query: ShopListDTO) {
    if (!query.where) {
      query.where = {};
    }

    const orders = await this.shopService.findMany({
      skip: query.skip,
      take: query.take,
      orderBy: query.sort
        ? {
            [query.sort.property]: query.sort.order,
          }
        : undefined,
      where: {
        ...(query.where ?? {}),
        ...(query.where.name
          ? {
              name: {
                contains: query.where.name,
                mode: 'insensitive',
              },
            }
          : {}),
      },
    });

    const count = await this.shopService.count({ where: query.where });

    const dtoItems = orders.map((i) => i.toDTO());

    return PaginationResponse(dtoItems, count, query);
  }

  @QueryPattern(ShopGetQuery)
  async getShop(@Payload('payload') query: ShopGetDTO) {
    return await this.shopService.get(query.id);
  }

  @CommandPattern(ShopCreateCommand)
  async handleCreate(@Payload('payload') dto: ShopCreateDTO) {
    const result = await this.shopService.create(dto);

    return result.toDTO();
  }

  @CommandPattern(ShopUpdateCommand)
  async handleUpdate(@Payload('payload') dto: ShopUpdateCommandDTO) {
    const result = await this.shopService.update(dto.id, dto);

    return result.toDTO();
  }
}
