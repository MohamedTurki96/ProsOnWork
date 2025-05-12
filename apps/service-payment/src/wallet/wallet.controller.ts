import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, QueryPattern } from '@pros-on-work/core';
import {
  PaginationResponse,
  WalletGetDTO,
  WalletGetQuery,
  WalletListDTO,
  WalletListQuery,
  WalletUpdateCommand,
  WalletUpdateDTO,
} from '@pros-on-work/resources';

import { WalletService } from './wallet.service';

@Controller('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @QueryPattern(WalletListQuery)
  async list(@Payload('payload') query: WalletListDTO) {
    if (!query.where) {
      query.where = {};
    }

    const wallets = await this.walletService.findMany({
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

    const count = await this.walletService.count({ where: query.where });

    const dtoItems = wallets.map((i) => i.toDTO());

    return PaginationResponse(dtoItems, count, query);
  }

  @QueryPattern(WalletGetQuery)
  async getWallet(@Payload('payload') query: WalletGetDTO) {
    return await this.walletService.get(query);
  }

  @CommandPattern(WalletUpdateCommand)
  async updateWallet(@Payload('payload') query: WalletUpdateDTO) {
    return await this.walletService.update(query);
  }
}
