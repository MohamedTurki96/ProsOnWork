import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import { ReservationCreateDTO, ReservationUpdateDTO } from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';
import { Prisma } from '../prisma';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
  ) {}

  async findMany(args: Prisma.ReservationFindManyArgs = {}) {
    if (!args.where) {
      args.where = {};
    }

    return await this.client.reservation.findMany({
      ...args,
    });
  }

  async count(args: Prisma.ReservationCountArgs = {}) {
    return await this.client.reservation.count(args);
  }

  async get(id: number) {
    const result = await this.client.reservation.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException('Reservation not found');
    }

    return result.toDTO();
  }

  async create(dto: ReservationCreateDTO) {
    return this.client.reservation.create({
      data: dto,
    });
  }

  async update(id: number, dto: ReservationUpdateDTO) {
    return this.client.reservation.update({
      where: { id },
      data: dto,
    });
  }
}
