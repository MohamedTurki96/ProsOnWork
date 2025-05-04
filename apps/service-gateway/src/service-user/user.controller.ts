import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser, EventHub } from '@pros-on-work/core';
import {
  CurrentUserDTO,
  UserDTO,
  UserGetQuery,
  UserListQuery,
  UserListResultDTO,
  UserListSortDTO,
  UserListWhereDTO,
  UserRole,
  UserUpdateCommand,
} from '@pros-on-work/resources';

import {
  ApiListQuery,
  ApiNeedsAuthentication,
} from '../decorators/api.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly eventHub: EventHub) {}

  @Get()
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiListQuery({
    response: UserListResultDTO,
    sort: UserListSortDTO,
    where: UserListWhereDTO,
  })
  listUsers(
    @Query('where') where: UserListWhereDTO,
    @Query('sort') sort: UserListSortDTO,
    @Query('skip') skip: number,
    @Query('take') take?: number,
  ) {
    return this.eventHub.sendQuery(
      new UserListQuery({ where, sort, skip, take }),
    );
  }

  @Get('me')
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  me(@CurrentUser() user: CurrentUserDTO) {
    return this.eventHub.sendQuery(new UserGetQuery({ id: user.id }));
  }

  @Put('me')
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UserUpdateCommand })
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  updateOwnUser(
    @CurrentUser() user: CurrentUserDTO,
    @Body() dto: UserUpdateCommand,
  ) {
    return this.eventHub.sendCommand(
      new UserUpdateCommand({ id: user.id, ...dto }),
    );
  }

  @Get(':id')
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  getUser(@Param('id') id: number) {
    return this.eventHub.sendQuery(new UserGetQuery({ id }));
  }
}
