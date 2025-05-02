import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { prismaExtensionExists, prismaToDTO } from '@pros-on-work/core';
import {
  CategoryDTO,
  ProductDTO,
  ShopDTO,
  WorkerDTO,
} from '@pros-on-work/resources';

import { PrismaClient } from './prisma';

export function createPrismaClient() {
  return new PrismaClient().$extends(prismaExtensionExists).$extends({
    result: {
      category: { toDTO: prismaToDTO(CategoryDTO) },
      shop: { toDTO: prismaToDTO(ShopDTO) },
      worker: { toDTO: prismaToDTO(WorkerDTO) },
      product: { toDTO: prismaToDTO(ProductDTO) },
    },
  });
}

export type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;
export type ExtendedTransactionClient = Omit<
  ExtendedPrismaClient,
  ITXClientDenyList
>;
