import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser, EventHub } from '@pros-on-work/core';
import {
  CurrentUserDTO,
  UserRole,
  WalletDTO,
  WalletGetQuery,
  WalletListQuery,
  WalletListResultDTO,
  WalletListSortDTO,
  WalletListWhereDTO,
} from '@pros-on-work/resources';

import {
  ApiListQuery,
  ApiNeedsAuthentication,
} from '../decorators/api.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletController {
  constructor(private readonly eventHub: EventHub) {}

  @Get()
  @Roles(UserRole.Admin)
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiListQuery({
    response: WalletListResultDTO,
    sort: WalletListSortDTO,
    where: WalletListWhereDTO,
  })
  list(
    @Query('where') where: WalletListWhereDTO,
    @Query('sort') sort: WalletListSortDTO,
    @Query('skip') skip: number,
    @Query('take') take?: number,
  ) {
    return this.eventHub.sendQuery(
      new WalletListQuery({ where, sort, skip, take }),
    );
  }

  @Get('/users')
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: WalletDTO })
  async getByUser(@CurrentUser() user: CurrentUserDTO) {
    return this.eventHub.sendQuery(new WalletGetQuery({ userId: user.id }));
  }

  @Get(':id')
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: WalletDTO })
  @ApiParam({ name: 'id', type: Number })
  async get(@Param('id') id: number) {
    return this.eventHub.sendQuery(new WalletGetQuery({ id }));
  }
}
