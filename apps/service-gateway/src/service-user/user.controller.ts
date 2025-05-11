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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser, EventHub } from '@pros-on-work/core';
import {
  CurrentUserDTO,
  PlansGetQuery,
  UserCreateCommand,
  UserCreateDTO,
  UserDTO,
  UserGetActiveQuery,
  UserGetQuery,
  UserListQuery,
  UserListResultDTO,
  UserListSortDTO,
  UserListWhereDTO,
  UserPlans,
  UserRole,
  UserUpdateCommand,
  UserUpdateDTO,
} from '@pros-on-work/resources';

import {
  ApiListQuery,
  ApiNeedsAuthentication,
} from '../decorators/api.decorator';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly eventHub: EventHub) {}

  @Get()
  @Public()
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
    return this.eventHub.sendQuery(new UserGetActiveQuery({ id: user.id }));
  }

  @Get('plans')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UserPlans })
  async plans(): Promise<UserPlans> {
    return this.eventHub.sendQuery(new PlansGetQuery());
  }

  @Put()
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UserUpdateDTO })
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  updateOwnUser(
    @CurrentUser() user: CurrentUserDTO,
    @Body() dto: UserUpdateDTO,
  ) {
    return this.eventHub.sendCommand(
      new UserUpdateCommand({ id: user.id, ...dto }),
    );
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  getUser(@Param('id') id: number) {
    return this.eventHub.sendQuery(new UserGetQuery({ id }));
  }

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: UserCreateDTO })
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  register(@Body() dto: UserCreateDTO) {
    return this.eventHub.sendCommand(new UserCreateCommand(dto));
  }
}
