import { BadRequestException, Type } from "@nestjs/common"
import { Prisma } from "@prisma/client/extension"
import { CursorPaginationDTO, TRANSFORM_OPTIONS } from "@pros-on-work/resources"
import { instanceToPlain, plainToInstance } from "class-transformer"

import { deleteUndefinedAndNullValues } from "./util"
import { PAGINATION_DEFAULT_SIZE, PAGINATION_MAX_SIZE } from "./util"

export type BasePrismaClient = {
  $connect(): Promise<void>
  $disconnect(): Promise<void>
  $queryRawUnsafe: (query: string) => unknown
}

export function prismaToDTO<T>(type: Type<T>, transformer?: (data: any) => T) {
  return {
    compute(data: any) {
      return () =>
        plainToInstance(
          type,
          transformer
            ? instanceToPlain(transformer(deleteUndefinedAndNullValues(data)))
            : instanceToPlain(deleteUndefinedAndNullValues(data)),
          TRANSFORM_OPTIONS
        ) as T
    },
  }
}

export const prismaExtensionExists = Prisma.defineExtension({
  name: "prisma-extension-exists",
  model: {
    $allModels: {
      async exists<T>(
        this: T,
        where: Prisma.Args<T, "findFirstOrThrow">["where"]
      ): Promise<boolean> {
        const ctx = Prisma.getExtensionContext(this)
        return (ctx as any)
          .findFirstOrThrow({ where, select: null })
          .then(() => true)
          .catch((err: unknown) => {
            // P2025 gets thrown when the record was not found.
            // https://www.prisma.io/docs/orm/reference/error-reference#p2025
            if (
              typeof err === "object" &&
              err &&
              "code" in err &&
              err.code === "P2025"
            ) {
              return false
            }

            // Throw every other error
            throw err
          })
      },
    },
  },
})

export function prismaCursorPaginationQuery(args: CursorPaginationDTO) {
  const { before, after, first, last } = args
  if (first !== null && first !== undefined && first < 0) {
    throw new BadRequestException(
      'Argument "first" must be a non-negative integer'
    )
  }

  if (last !== null && last !== undefined && last < 0) {
    throw new BadRequestException(
      'Argument "last" must be a non-negative integer'
    )
  }

  if (before && after) {
    throw new BadRequestException(
      'Arguments "before" and "after" are not supported at the same time'
    )
  }

  if (
    before !== null &&
    before !== undefined &&
    first !== null &&
    first !== undefined
  ) {
    throw new BadRequestException(
      'Arguments "before" and "first" are not supported at the same time'
    )
  }

  if (
    after !== null &&
    after !== undefined &&
    last !== null &&
    last !== undefined
  ) {
    throw new BadRequestException(
      'Arguments "after" and "last" are not supported at the same time'
    )
  }

  const cursor = before ?? after

  let take =
    Math.min(first ?? last ?? PAGINATION_DEFAULT_SIZE, PAGINATION_MAX_SIZE) + 1

  if (before || last) {
    take = -take
  }

  return cursor
    ? {
        cursor: { id: cursor },
        take,
        skip: 1,
      }
    : { take, skip: 0 }
}
