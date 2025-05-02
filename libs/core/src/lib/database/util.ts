import { CursorPaginationDTO, ListResultDTO } from "@pros-on-work/resources"

export function generateCudItems<O extends { id: string }, N>(
  oldItems: O[],
  newItems?: N[]
): { toCreate: N[]; toDelete: O[]; toUpdate: N[] }

export function generateCudItems<O, N>(
  oldItems: O[],
  newItems: N[],
  where: undefined,
  identifierKey?: string
): { toCreate: N[]; toDelete: O[]; toUpdate: N[] }
export function generateCudItems<O, N, W>(
  oldItems: O[],
  newItems: N[],
  where: (i: N) => W,
  identifierKey?: string
): { toCreate: N[]; toDelete: O[]; toUpdate: { data: N; where: W }[] }
export function generateCudItems<
  O extends Record<string, unknown>,
  N extends Record<string, unknown>,
  W,
>(
  oldItems: O[],
  newItems: N[] = [],
  /**
   * If `where` is defined the function defines the returned query in the to update resources. So the array can be directly used for prisma.
   */
  where?: (i: N) => W,
  /**
   * Defines the name of the identifier key (default = "id"), which should be used for filtering.
   */
  identifierKey = "id"
): { toCreate: N[]; toDelete: O[]; toUpdate: ({ data: N; where: W } | N)[] } {
  let toDelete: O[] = oldItems || []
  let toCreate: N[] = newItems || []
  let toUpdate: ({ data: N; where: W } | N)[] = []

  if (oldItems?.length) {
    const oldIds = new Set(oldItems?.map((e) => e[identifierKey]))
    const newIds = new Set(newItems?.map((e) => e[identifierKey]))
    toDelete = oldItems?.filter((e) => !newIds.has(e[identifierKey]))
    toUpdate = newItems
      ?.filter((e) => oldIds.has(e[identifierKey] || ""))
      .map((e) =>
        where
          ? {
              data: e,
              where: where(e),
            }
          : e
      )
    toCreate = newItems?.filter((e) => !oldIds.has(e[identifierKey] || ""))
  }

  return {
    toCreate,
    toDelete,
    toUpdate,
  }
}

// Does not mutate the original object
export function deleteUndefinedAndNullValues(obj: Record<string, unknown>) {
  return JSON.parse(
    JSON.stringify(obj, (_key, value) => {
      return value === null ? undefined : value
    })
  )
}

export function removeKeysFromObject<T>(keys: string[], obj: T): T {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      return keys.includes(key) ? undefined : value
    })
  )
}

export const PAGINATION_MAX_SIZE = 100
export const PAGINATION_DEFAULT_SIZE = 20

export function generateListResult<T extends { id: string }>(
  items: T[],
  totalCount: number,
  args: CursorPaginationDTO
): ListResultDTO<T> {
  const startCursor = items[0]?.["id"]
  const endCursor = items[items.length - 1]?.["id"]

  const take =
    Math.min(
      args.first ?? args.last ?? PAGINATION_DEFAULT_SIZE,
      PAGINATION_MAX_SIZE
    ) + 1
  const gotFullResults = items.length === Math.abs(take)
  // https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo.Fields
  const hasNextPage = args.before ? true : args.last ? false : gotFullResults
  const hasPreviousPage = args.after
    ? true
    : args.before || args.last
      ? gotFullResults
      : false

  return {
    items,
    totalCount,
    pageInfo: {
      startCursor,
      endCursor,
      hasNextPage,
      hasPreviousPage,
    },
  }
}
