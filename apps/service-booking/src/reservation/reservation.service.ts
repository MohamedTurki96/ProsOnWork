import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventHub, PRISMA_CLIENT } from '@pros-on-work/core';
import {
  PaymentCreateCommand,
  PaymentType,
  ProductDTO,
  ProductGetQuery,
  ReservationCreateDTO,
  ReservationStatus,
  ReservationUpdateDTO,
  ShopDTO,
  ShopGetQuery,
  UserDTO,
  UserGetQuery,
  WalletDTO,
  WalletGetQuery,
  WalletUpdateCommand,
} from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';
import { Prisma } from '../prisma';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
    private readonly eventHub: EventHub,
  ) {}

  async findMany(args: Prisma.ReservationFindManyArgs = {}) {
    if (!args.where) {
      args.where = {};
    }
    if (!args.skip) {
      delete args.skip;
    }

    if (!args.take) {
      delete args.take;
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
    const wallet = await this.eventHub.sendQuery<WalletDTO>(
      new WalletGetQuery({
        userId: dto.userId,
      }),
    );

    const product = await this.eventHub.sendQuery<ProductDTO>(
      new ProductGetQuery({
        id: dto.productId,
      }),
    );

    if (wallet.balance < product.price) {
      throw new BadRequestException('Solde insuffisant');
    }

    return this.client.reservation.create({
      data: dto,
    });
  }

  async update(id: number, dto: ReservationUpdateDTO) {
    if (dto.status == ReservationStatus.Confirmed) {
      const reservation = await this.client.reservation.findUnique({
        where: {
          id,
        },
      });

      const wallet = await this.eventHub.sendQuery<WalletDTO>(
        new WalletGetQuery({
          userId: reservation.userId,
        }),
      );

      const product = await this.eventHub.sendQuery<ProductDTO>(
        new ProductGetQuery({
          id: reservation.productId,
        }),
      );

      if (wallet.balance < product.price) {
        dto.status = ReservationStatus.Canceled;
      } else {
        const shop = await this.eventHub.sendQuery<ShopDTO>(
          new ShopGetQuery({
            id: product.shopId,
          }),
        );

        const provider = await this.eventHub.sendQuery<UserDTO>(
          new UserGetQuery({
            id: shop.ownerId,
          }),
        );

        const providerWallet = await this.eventHub.sendQuery<WalletDTO>(
          new WalletGetQuery({
            userId: provider.id,
          }),
        );

        await this.eventHub.sendCommand(
          new PaymentCreateCommand({
            amount: product.price,
            walletId: wallet.id,
            type: PaymentType.Reservation,
          }),
        );

        await this.eventHub.sendCommand(
          new WalletUpdateCommand({
            walletId: wallet.id,
            amount: product.price,
            increment: false,
          }),
        );

        await this.eventHub.sendCommand(
          new PaymentCreateCommand({
            amount: product.price,
            walletId: providerWallet.id,
            type: PaymentType.Reservation,
          }),
        );

        await this.eventHub.sendCommand(
          new WalletUpdateCommand({
            walletId: providerWallet.id,
            amount: product.price,
            increment: true,
          }),
        );
      }
    }

    return this.client.reservation.update({
      where: { id },
      data: {
        status: dto.status,
        ...(dto.status == ReservationStatus.Canceled
          ? { canceledAt: new Date() }
          : dto.status == ReservationStatus.Confirmed
            ? { acceptedAt: new Date() }
            : {}),
      },
    });
  }
}
