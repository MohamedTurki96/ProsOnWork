import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { QueryPattern } from '@pros-on-work/core';
import {
  PaginationResponse,
  ProductGetDTO,
  ProductGetQuery,
  ProductListDTO,
  ProductListQuery,
} from '@pros-on-work/resources';

import { ProductService } from './product.service';

@Controller('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @QueryPattern(ProductListQuery)
  async listProducts(@Payload('payload') query: ProductListDTO) {
    if (!query.where) {
      query.where = {};
    }

    const products = await this.productService.findMany({
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

    const count = await this.productService.count({ where: query.where });

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
