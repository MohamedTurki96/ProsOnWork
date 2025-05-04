import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { prismaExtensionExists } from '@pros-on-work/core';

import { PrismaClient } from './prisma';

export function createPrismaClient() {
  return new PrismaClient().$extends(prismaExtensionExists).$extends({
    result: {},
  });
}

export type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;
export type ExtendedTransactionClient = Omit<
  ExtendedPrismaClient,
  ITXClientDenyList
>;
