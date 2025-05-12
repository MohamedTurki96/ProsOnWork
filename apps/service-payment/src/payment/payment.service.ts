import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import {
  CurrentUserDTO,
  PaymentCreateCashInCommandDTO,
  PaymentCreateDTO,
  PaymentStatus,
  PaymentType,
  PaymentUpdateDTO,
  UserRole,
} from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';
import { Prisma } from '../prisma';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
    private readonly walletService: WalletService,
  ) {}

  async findMany(args: Prisma.PaymentFindManyArgs = {}, user: CurrentUserDTO) {
    if (!args.where) {
      args.where = {};
    }

    if (!args.skip) {
      delete args.skip;
    }

    if (!args.take) {
      delete args.take;
    }

    if (user.role !== UserRole.Admin) {
      args.where = {
        ...args.where,
        wallet: {
          userId: user.id,
        },
      };
    }

    return await this.client.payment.findMany(args);
  }

  async count(args: Prisma.PaymentCountArgs = {}) {
    return await this.client.payment.count(args);
  }

  async get(id: number) {
    const result = await this.client.payment.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException('Payment not found');
    }

    return result.toDTO();
  }

  async update(data: PaymentUpdateDTO) {
    return await this.client.payment.update({
      where: { id: data.id },
      data: {
        status: data.status,
      },
    });
  }

  async createCashIn(data: PaymentCreateCashInCommandDTO) {
    const wallet = await this.walletService.get({
      userId: data.userId,
    });

    return await this.client.$transaction(async (client) => {
      const payment = await client.payment.create({
        data: {
          walletId: wallet.id,
          type: PaymentType.CashIn,
          amount: data.amount,
          status: PaymentStatus.Completed,
        },
      });

      await this.client.wallet.update({
        where: { id: payment.walletId },
        data: {
          balance: {
            increment: payment.amount,
          },
        },
      });

      return payment;
    });
  }

  async create(data: PaymentCreateDTO) {
    return await this.client.$transaction(async (client) => {
      const payment = await client.payment.create({
        data: {
          walletId: data.walletId,
          type: data.type,
          amount: data.amount,
          ...(data.type == PaymentType.Reservation
            ? { status: PaymentStatus.Completed }
            : {}),
        },
      });

      return payment;
    });
  }
}
