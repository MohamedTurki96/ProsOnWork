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
  UserRole,
  WorkerCreateCommand,
  WorkerCreateDTO,
  WorkerDTO,
  WorkerGetQuery,
  WorkerListQuery,
  WorkerListResultDTO,
  WorkerListSortDTO,
  WorkerListWhereDTO,
  WorkerUpdateCommand,
  WorkerUpdateDTO,
} from '@pros-on-work/resources';

import { ApiListQuery, ApiNeedsAuthentication } from '../decorators/api.decorator';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Workers')
@Controller('workers')
export class WorkerController {
  constructor(private readonly eventHub: EventHub) {}

  @Get()
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiListQuery({
    response: WorkerListResultDTO,
    sort: WorkerListSortDTO,
    where: WorkerListWhereDTO,
  })
  list(
    @Query('where') where: WorkerListWhereDTO,
    @Query('sort') sort: WorkerListSortDTO,
    @Query('skip') skip: number,
    @Query('take') take?: number,
  ) {
    return this.eventHub.sendQuery(
      new WorkerListQuery({ where, sort, skip, take }),
    );
  }

  @Post()
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin, UserRole.ServiceProvider)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: WorkerDTO })
  @ApiBody({ type: WorkerCreateDTO })
  async create(@Body() dto: WorkerCreateDTO) {
    return this.eventHub.sendCommand(new WorkerCreateCommand(dto));
  }

  @Put(':id')
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin, UserRole.ServiceProvider)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: WorkerDTO })
  @ApiParam({ name: 'id', type: Number })
  async update(@Param('id') id: number, @Body() dto: WorkerUpdateDTO) {
    return this.eventHub.sendCommand(new WorkerUpdateCommand({ id, ...dto }));
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: WorkerDTO })
  @ApiParam({ name: 'id', type: Number })
  async get(@Param('id') id: number) {
    return this.eventHub.sendQuery(new WorkerGetQuery({ id }));
  }
}
