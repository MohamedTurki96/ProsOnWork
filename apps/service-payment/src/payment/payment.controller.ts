import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, CurrentUser, QueryPattern } from '@pros-on-work/core';
import {
  CurrentUserDTO,
  PaginationResponse,
  PaymentCreateCashInCommand,
  PaymentCreateCashInCommandDTO,
  PaymentCreateCommand,
  PaymentCreateDTO,
  PaymentListDTO,
  PaymentListQuery,
  PaymentUpdateCommand,
  PaymentUpdateDTO,
} from '@pros-on-work/resources';

import { PaymentService } from './payment.service';

@Controller('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @QueryPattern(PaymentListQuery)
  async list(@Payload('payload') query: PaymentListDTO, @CurrentUser() user: CurrentUserDTO) {
    if (!query.where) {
      query.where = {};
    }

    const payments = await this.paymentService.findMany({
      skip: query.skip,
      take: query.take,
      orderBy: query.sort
        ? {
            [query.sort.property]: query.sort.order,
          }
        : undefined,
      where: {
        ...(query.where ?? {}),
      },
    }, user);

    const count = await this.paymentService.count({ where: query.where });

    const dtoItems = payments.map((i) => i.toDTO());

    return PaginationResponse(dtoItems, count, query);
  }

  @CommandPattern(PaymentUpdateCommand)
  async handleUpdate(@Payload('payload') dto: PaymentUpdateDTO) {
    const result = await this.paymentService.update(dto);

    return result.toDTO();
  }

  @CommandPattern(PaymentCreateCashInCommand)
  async createCashIn(@Payload('payload') dto: PaymentCreateCashInCommandDTO) {
    const result = await this.paymentService.createCashIn(dto);

    return result.toDTO();
  }

  @CommandPattern(PaymentCreateCommand)
  async create(@Payload('payload') dto: PaymentCreateDTO) {
    const result = await this.paymentService.create(dto);

    return result.toDTO();
  }
}
