import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventHub } from '@pros-on-work/core';
import {
  ProductCreateCommand,
  ProductCreateDTO,
  ProductDTO,
  ProductGetQuery,
  ProductListQuery,
  ProductListResultDTO,
  ProductListSortDTO,
  ProductListWhereDTO,
  ProductUpdateCommand,
  ProductUpdateDTO,
  UserRole,
} from '@pros-on-work/resources';

import {
  ApiListQuery,
  ApiNeedsAuthentication,
} from '../decorators/api.decorator';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly eventHub: EventHub) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiListQuery({
    response: ProductListResultDTO,
    sort: ProductListSortDTO,
    where: ProductListWhereDTO,
  })
  list(
    @Query('where') where: ProductListWhereDTO,
    @Query('sort') sort: ProductListSortDTO,
    @Query('skip') skip: number,
    @Query('take') take?: number,
  ) {
    return this.eventHub.sendQuery(
      new ProductListQuery({ where, sort, skip, take }),
    );
  }

  @Post()
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin, UserRole.ServiceProvider)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: ProductDTO })
  @ApiBody({ type: ProductCreateDTO })
  async create(@Body() dto: ProductCreateDTO) {
    return this.eventHub.sendCommand(new ProductCreateCommand(dto));
  }

  @Put(':id')
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin, UserRole.ServiceProvider)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ProductUpdateDTO })
  @ApiResponse({ status: HttpStatus.OK, type: ProductDTO })
  @ApiParam({ name: 'id', type: Number })
  async update(@Param('id') id: number, @Body() dto: ProductUpdateDTO) {
    return this.eventHub.sendCommand(new ProductUpdateCommand({ id, ...dto }));
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ProductDTO })
  @ApiParam({ name: 'id', type: Number })
  async get(@Param('id') id: number) {
    return this.eventHub.sendQuery(new ProductGetQuery({ id }));
  }
}
