import {
  Body,
  Controller,
  Delete,
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
  CategoryCreateCommand,
  CategoryCreateDTO,
  CategoryDeleteCommand,
  CategoryDTO,
  CategoryGetQuery,
  CategoryListQuery,
  CategoryListResultDTO,
  CategoryListSortDTO,
  CategoryListWhereDTO,
  CategoryUpdateCommand,
  CategoryUpdateDTO,
  UserRole,
} from '@pros-on-work/resources';

import {
  ApiListQuery,
  ApiNeedsAuthentication,
} from '../decorators/api.decorator';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly eventHub: EventHub) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiListQuery({
    response: CategoryListResultDTO,
    sort: CategoryListSortDTO,
    where: CategoryListWhereDTO,
  })
  list(
    @Query('where') where: CategoryListWhereDTO,
    @Query('sort') sort: CategoryListSortDTO,
    @Query('skip') skip: number,
    @Query('take') take?: number,
  ) {
    return this.eventHub.sendQuery(
      new CategoryListQuery({ where, sort, skip, take }),
    );
  }

  @Post()
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: CategoryDTO })
  @ApiBody({ type: CategoryCreateDTO })
  async create(@Body() dto: CategoryCreateDTO) {
    return this.eventHub.sendCommand(new CategoryCreateCommand(dto));
  }

  @Put(':id')
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: CategoryDTO })
  @ApiBody({ type: CategoryUpdateDTO })
  @ApiParam({ name: 'id', type: Number })
  async update(@Param('id') id: number, @Body() dto: CategoryUpdateDTO) {
    return this.eventHub.sendCommand(new CategoryUpdateCommand({ id, ...dto }));
  }

  @Delete(':id')
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiParam({ name: 'id', type: Number })
  async delete(@Param('id') id: number) {
    return this.eventHub.sendQuery(new CategoryDeleteCommand({ id }));
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: CategoryDTO })
  @ApiParam({ name: 'id', type: Number })
  async get(@Param('id') id: number) {
    return this.eventHub.sendQuery(new CategoryGetQuery({ id }));
  }
}
