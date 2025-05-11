import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, EventHub, QueryPattern } from '@pros-on-work/core';
import {
  PaginationResponse,
  PlansGetQuery,
  UserCreateCommand,
  UserCreatedEvent,
  UserCreateDTO,
  UserGetActiveQuery,
  UserGetDTO,
  UserGetQuery,
  UserListDTO,
  UserListQuery,
  UserPlan,
  UserUpdateCommand,
  UserUpdateCommandDTO,
  UserUpdatedEvent,
} from '@pros-on-work/resources';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly eventHub: EventHub,
  ) {}

  @QueryPattern(UserListQuery)
  async listUsers(@Payload('payload') query: UserListDTO) {
    if (!query.where) {
      query.where = {};
    }

    const orders = await this.userService.findMany({
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

    const count = await this.userService.count({ where: query.where });

    const dtoItems = orders.map((i) => i.toDTO());

    return PaginationResponse(dtoItems, count, query);
  }

  @QueryPattern(UserGetQuery)
  async getUser(@Payload('payload') query: UserGetDTO) {
    return await this.userService.get(query);
  }

  @QueryPattern(UserGetActiveQuery)
  async getActiveUser(@Payload('payload') query: UserGetDTO) {
    return await this.userService.getActive(query);
  }

  @QueryPattern(PlansGetQuery)
  async getPlans() {
    return {
      [UserPlan.Basic]: 50,
      [UserPlan.Business]: 100,
      [UserPlan.Premium]: 150,
    };
  }

  @CommandPattern(UserCreateCommand)
  async handleCreate(@Payload('payload') dto: UserCreateDTO) {
    const result = await this.userService.create(dto);

    await this.eventHub.emitEvent(
      new UserCreatedEvent({
        id: result.user.id,
        verificationToken: result.emailVerificationToken.token
      }),
    );

    return result.user.toDTO();
  }

  @CommandPattern(UserUpdateCommand)
  async handleUpdate(@Payload('payload') dto: UserUpdateCommandDTO) {
    const result = await this.userService.update(dto.id, dto);

    await this.eventHub.emitEvent(
      new UserUpdatedEvent({
        id: result.id,
      }),
    );

    return result.toDTO();
  }
}
