import { ITXClientDenyList } from '@prisma/client/runtime/library';
// eslint-disable-next-line unused-imports/no-unused-imports
import { prismaExtensionExists, prismaToDTO } from '@pros-on-work/core';

// eslint-disable-next-line @nx/enforce-module-boundaries
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
