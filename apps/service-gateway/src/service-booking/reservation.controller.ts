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
  ReservationCreateCommand,
  ReservationCreateDTO,
  ReservationDTO,
  ReservationGetQuery,
  ReservationListQuery,
  ReservationListResultDTO,
  ReservationListSortDTO,
  ReservationListWhereDTO,
  ReservationStatus,
  ReservationUpdateCommand,
  UserRole,
} from '@pros-on-work/resources';

import { ApiListQuery, ApiNeedsAuthentication } from '../decorators/api.decorator';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly eventHub: EventHub) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiListQuery({
    response: ReservationListResultDTO,
    sort: ReservationListSortDTO,
    where: ReservationListWhereDTO,
  })
  list(
    @Query('where') where: ReservationListWhereDTO,
    @Query('sort') sort: ReservationListSortDTO,
    @Query('skip') skip: number,
    @Query('take') take?: number,
  ) {
    return this.eventHub.sendQuery(
      new ReservationListQuery({ where, sort, skip, take }),
    );
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.ServiceProvider, UserRole.Client)
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: HttpStatus.OK, type: ReservationDTO })
  async get(@Param('id') id: number) {
    return this.eventHub.sendQuery(new ReservationGetQuery({ id }));
  }

  @Post()
  @Roles(UserRole.Client)
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: ReservationCreateDTO })
  @ApiResponse({ status: HttpStatus.CREATED, type: ReservationDTO })
  async create(@Body() dto: ReservationCreateDTO) {
    return this.eventHub.sendCommand(new ReservationCreateCommand(dto));
  }

  @Put(':id/accept')
  @Roles(UserRole.Admin, UserRole.ServiceProvider)
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ReservationDTO })
  @ApiParam({ name: 'id', type: Number })
  async accept(@Param('id') id: number) {
    return this.eventHub.sendCommand(
      new ReservationUpdateCommand({ id, status: ReservationStatus.Confirmed }),
    );
  }

  @Put(':id/cancel')
  @Roles(UserRole.Admin, UserRole.ServiceProvider, UserRole.Client)
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ReservationDTO })
  @ApiParam({ name: 'id', type: Number })
  async cancel(@Param('id') id: number) {
    return this.eventHub.sendCommand(
      new ReservationUpdateCommand({ id, status: ReservationStatus.Canceled }),
    );
  }
}
