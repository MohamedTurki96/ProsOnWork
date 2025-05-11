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
import { CurrentUser, EventHub } from '@pros-on-work/core';
import {
  CurrentUserDTO,
  PaymentCreateCashInCommand,
  PaymentCreateCashInDTO,
  PaymentDTO,
  PaymentListQuery,
  PaymentListResultDTO,
  PaymentListSortDTO,
  PaymentListWhereDTO,
  PaymentStatus,
  PaymentUpdateCommand,
  UserRole,
} from '@pros-on-work/resources';

import {
  ApiListQuery,
  ApiNeedsAuthentication,
} from '../decorators/api.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly eventHub: EventHub) {}

  @Get()
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiListQuery({
    response: PaymentListResultDTO,
    sort: PaymentListSortDTO,
    where: PaymentListWhereDTO,
  })
  list(
    @Query('where') where: PaymentListWhereDTO,
    @Query('sort') sort: PaymentListSortDTO,
    @Query('skip') skip: number,
    @Query('take') take?: number,
  ) {
    return this.eventHub.sendQuery(
      new PaymentListQuery({ where, sort, skip, take }),
    );
  }

  @Put(':id/accept-cashout')
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: HttpStatus.OK, type: PaymentDTO })
  async acceptCashout(@Param('id') id: number) {
    return this.eventHub.sendCommand(
      new PaymentUpdateCommand({
        id,
        status: PaymentStatus.Completed,
      }),
    );
  }

  @Put(':id/decline-cashout')
  @ApiNeedsAuthentication()
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: HttpStatus.OK, type: PaymentDTO })
  async declineCashout(@Param('id') id: number) {
    return this.eventHub.sendCommand(
      new PaymentUpdateCommand({
        id,
        status: PaymentStatus.Failed,
      }),
    );
  }

  @Post('cash-in')
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: PaymentCreateCashInDTO, required: true })
  @ApiResponse({ status: HttpStatus.OK, type: PaymentDTO })
  async createCashIn(
    @Body() data: PaymentCreateCashInDTO,
    @CurrentUser() user: CurrentUserDTO,
  ) {
    return this.eventHub.sendCommand(
      new PaymentCreateCashInCommand({
        userId: user.id,
        ...data,
      }),
    );
  }
}
