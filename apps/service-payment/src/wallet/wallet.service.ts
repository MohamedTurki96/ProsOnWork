import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import { WalletGetDTO, WalletUpdateDTO } from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';
import { Prisma } from '../prisma';

@Injectable()
export class WalletService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
  ) {}

  async findMany(args: Prisma.WalletFindManyArgs = {}) {
    if (!args.where) {
      args.where = {};
    }

    if (!args.skip) {
      delete args.skip;
    }

    if (!args.take) {
      delete args.take;
    }

    return await this.client.wallet.findMany(args);
  }

  async count(args: Prisma.WalletCountArgs = {}) {
    return await this.client.wallet.count(args);
  }

  async get(query: WalletGetDTO) {
    const result = await this.client.wallet.findUnique({
      where: query.id ? { id: query.id } : { userId: query.userId },
    });

    if (!result) {
      throw new NotFoundException('Wallet not found');
    }

    return result.toDTO();
  }

  async update(query: WalletUpdateDTO) {
    return await this.client.wallet.update({
      where: { id: query.walletId },
      data: {
        balance: {
          ...(query.increment
            ? { increment: query.amount }
            : { decrement: query.amount }),
        },
      },
    });
  }
}
