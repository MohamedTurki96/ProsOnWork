import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { prismaExtensionExists, prismaToDTO } from '@pros-on-work/core';
import { ReservationDTO } from '@pros-on-work/resources';

import { PrismaClient } from './prisma';

export function createPrismaClient() {
  return new PrismaClient().$extends(prismaExtensionExists).$extends({
    result: {
      reservation: {toDTO: prismaToDTO(ReservationDTO)}
    },
  });
}

export type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;
export type ExtendedTransactionClient = Omit<
  ExtendedPrismaClient,
  ITXClientDenyList
>;
