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
  ShopCreateCommand,
  ShopCreateDTO,
  ShopDTO,
  ShopGetQuery,
  ShopListQuery,
  ShopListResultDTO,
  ShopListSortDTO,
  ShopListWhereDTO,
  ShopUpdateCommand,
  ShopUpdateDTO,
  UserRole,
} from '@pros-on-work/resources';

import {
  ApiListQuery,
  ApiNeedsAuthentication,
} from '../decorators/api.decorator';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Shops')
@Controller('shops')
export class ShopController {
  constructor(private readonly eventHub: EventHub) {}

  @Get()
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiListQuery({
    response: ShopListResultDTO,
    sort: ShopListSortDTO,
    where: ShopListWhereDTO,
  })
  list(
    @Query('where') where: ShopListWhereDTO,
    @Query('sort') sort: ShopListSortDTO,
    @Query('skip') skip: number,
    @Query('take') take?: number,
  ) {
    return this.eventHub.sendQuery(
      new ShopListQuery({ where, sort, skip, take }),
    );
  }

  @Post()
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin, UserRole.ServiceProvider)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: ShopDTO })
  @ApiBody({ type: ShopCreateDTO })
  async create(@Body() dto: ShopCreateDTO) {
    return this.eventHub.sendCommand(new ShopCreateCommand(dto));
  }

  @Put(':id')
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin, UserRole.ServiceProvider)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ShopDTO })
  @ApiParam({ name: 'id', type: Number })
  async update(@Param('id') id: number, @Body() dto: ShopUpdateDTO) {
    return this.eventHub.sendCommand(new ShopUpdateCommand({ id, ...dto }));
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ShopDTO })
  @ApiParam({ name: 'id', type: Number })
  async get(@Param('id') id: number) {
    return this.eventHub.sendQuery(new ShopGetQuery({ id }));
  }
}
