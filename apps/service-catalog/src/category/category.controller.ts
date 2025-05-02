import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, QueryPattern } from '@pros-on-work/core';
import {
  CategoryCreateCommand,
  CategoryCreateDTO,
  CategoryGetDTO,
  CategoryGetQuery,
  CategoryListDTO,
  CategoryListQuery,
  CategoryUpdateCommand,
  CategoryUpdateCommandDTO,
  PaginationResponse,
} from '@pros-on-work/resources';

import { CategoryService } from './category.service';

@Controller('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @QueryPattern(CategoryListQuery)
  async listCategorys(@Payload('payload') query: CategoryListDTO) {
    if (!query.where) {
      query.where = {};
    }

    const orders = await this.categoryService.findMany({
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

    const count = await this.categoryService.count({ where: query.where });

    const dtoItems = orders.map((i) => i.toDTO());

    return PaginationResponse(dtoItems, count, query);
  }

  @QueryPattern(CategoryGetQuery)
  async getCategory(@Payload('payload') query: CategoryGetDTO) {
    return await this.categoryService.get(query.id);
  }

  @CommandPattern(CategoryCreateCommand)
  async handleCreate(@Payload('payload') dto: CategoryCreateDTO) {
    const result = await this.categoryService.create(dto);

    return result.toDTO();
  }

  @CommandPattern(CategoryUpdateCommand)
  async handleUpdate(@Payload('payload') dto: CategoryUpdateCommandDTO) {
    const result = await this.categoryService.update(dto.id, dto);

    return result.toDTO();
  }
}
