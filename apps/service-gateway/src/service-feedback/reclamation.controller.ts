import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventHub } from '@pros-on-work/core';
import {
  ReclamationCreateCommand,
  ReclamationCreateDTO,
  ReclamationDTO,
  ReclamationGetQuery,
  UserRole,
} from '@pros-on-work/resources';

import { ApiNeedsAuthentication } from '../decorators/api.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Reclamations')
@Controller('reclamations')
export class ReclamationController {
  constructor(private readonly eventHub: EventHub) {}

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
}
