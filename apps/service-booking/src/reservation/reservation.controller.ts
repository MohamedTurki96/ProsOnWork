import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, QueryPattern } from '@pros-on-work/core';
import {
  PaginationResponse,
  ReservationCreateCommand,
  ReservationCreateDTO,
  ReservationGetDTO,
  ReservationGetQuery,
  ReservationListDTO,
  ReservationListQuery,
  ReservationUpdateCommand,
  ReservationUpdateDTO,
} from '@pros-on-work/resources';

import { ReservationService } from './reservation.service';

@Controller('Reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @QueryPattern(ReservationListQuery)
  async listReservations(@Payload('payload') query: ReservationListDTO) {
    if (!query.where) {
      query.where = {};
    }
    
    const reservations = await this.reservationService.findMany({
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
    });

    const count = await this.reservationService.count({ where: query.where });

    const dtoItems = reservations.map((i) => i.toDTO());

    return PaginationResponse(dtoItems, count, query);
  }

  @QueryPattern(ReservationGetQuery)
  async getReservation(@Payload('payload') query: ReservationGetDTO) {
    return await this.reservationService.get(query.id);
  }

  @CommandPattern(ReservationCreateCommand)
  async handleCreate(@Payload('payload') dto: ReservationCreateDTO) {
    const result = await this.reservationService.create(dto);

    return result.toDTO();
  }

  @CommandPattern(ReservationUpdateCommand)
  async handleUpdate(@Payload('payload') dto: ReservationUpdateDTO) {
    const result = await this.reservationService.update(dto.id, dto);

    return result.toDTO();
  }
}
