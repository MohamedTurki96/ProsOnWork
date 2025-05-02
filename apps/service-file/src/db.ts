import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { prismaExtensionExists, prismaToDTO } from '@pros-on-work/core';
import { MediaDTO } from '@pros-on-work/resources';
import { ServerURL } from '@pros-on-work/utils';

import { PrismaClient } from './prisma';

export function createPrismaClient() {
  return new PrismaClient().$extends(prismaExtensionExists).$extends({
    result: {
      media: {
        url: {
          needs: { filePath: true },
          compute(file) {
            return new URL(file.filePath, ServerURL.get).href;
          },
        },
        toDTO: prismaToDTO(MediaDTO),
      },
    },
  });
}

export type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;
export type ExtendedTransactionClient = Omit<
  ExtendedPrismaClient,
  ITXClientDenyList
>;
