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
  ReclamationCreateCommand,
  ReclamationCreateDTO,
  ReclamationDTO,
  ReclamationGetQuery,
  ReclamationListQuery,
  ReclamationListResultDTO,
  ReclamationListSortDTO,
  ReclamationListWhereDTO,
  ReclamationStatus,
  ReclamationUpdateCommand,
  UserRole,
} from '@pros-on-work/resources';

import {
  ApiListQuery,
  ApiNeedsAuthentication,
} from '../decorators/api.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Reclamations')
@Controller('reclamations')
export class ReclamationController {
  constructor(private readonly eventHub: EventHub) {}

  @Get()
  @Roles(UserRole.Admin)
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiListQuery({
    response: ReclamationListResultDTO,
    sort: ReclamationListSortDTO,
    where: ReclamationListWhereDTO,
  })
  list(
    @Query('where') where: ReclamationListWhereDTO,
    @Query('sort') sort: ReclamationListSortDTO,
    @Query('skip') skip: number,
    @Query('take') take?: number,
  ) {
    return this.eventHub.sendQuery(
      new ReclamationListQuery({ where, sort, skip, take }),
    );
  }

  @Post()
  @Roles(UserRole.Client)
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: ReclamationCreateDTO })
  @ApiResponse({ status: HttpStatus.CREATED, type: ReclamationDTO })
  async create(@Body() dto: ReclamationCreateDTO) {
    return this.eventHub.sendCommand(new ReclamationCreateCommand(dto));
  }

  @Get(':id')
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: HttpStatus.OK, type: ReclamationDTO })
  async get(@Param('id') id: number) {
    return this.eventHub.sendQuery(new ReclamationGetQuery({ id }));
  }

  @Put(':id/progress')
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: HttpStatus.OK, type: ReclamationDTO })
  async progress(@Param('id') id: number) {
    return this.eventHub.sendCommand(
      new ReclamationUpdateCommand({
        id,
        status: ReclamationStatus.InProgress,
      }),
    );
  }

  @Put(':id/solve')
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: HttpStatus.OK, type: ReclamationDTO })
  async solve(@Param('id') id: number) {
    return this.eventHub.sendCommand(
      new ReclamationUpdateCommand({ id, status: ReclamationStatus.Resolved }),
    );
  }
}
