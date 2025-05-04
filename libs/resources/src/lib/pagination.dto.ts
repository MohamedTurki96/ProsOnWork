import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { Type } from "class-transformer"
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator"

export class PaginationDTO {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Expose()
  @ApiPropertyOptional({ type: Number })
  skip?: number
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Expose()
  @ApiPropertyOptional({ type: Number })
  take?: number
}

export class PaginationMetaDTO {
  /**
   * the total amount of items
   */
  @IsDefined()
  @IsNumber()
  @Type(() => Number)
  @Expose()
  @ApiProperty({ type: Number })
  totalItems: number
  /**
   * Offset to get the next results
   * undefined = no results anymore
   */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Expose()
  @ApiPropertyOptional({ type: Number })
  nextOffset?: number

  @IsDefined()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  hasMoreItems: boolean

  @IsDefined()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  hasPrevItems: boolean

  /**
   * current offset
   */
  @IsDefined()
  @IsNumber()
  @Type(() => Number)
  @Expose()
  @ApiProperty({ type: Number })
  currentOffset: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Expose()
  @ApiPropertyOptional({ type: Number })
  prevOffset?: number
}

export class PaginationResultDTO<T> {
  @IsDefined()
  @IsArray()
  @IsObject({ each: true })
  items: T[]
  @IsDefined()
  @ValidateNested()
  @Type(() => PaginationMetaDTO)
  @Expose()
  @ApiProperty({ type: PaginationMetaDTO })
  meta: PaginationMetaDTO
}

export function PaginationResponse<T>(
  items: T[],
  totalCount: number,
  pagination: PaginationDTO
): PaginationResultDTO<T> {
  const { skip = 0, take } = pagination

  const hasMore = skip + items.length < totalCount
  const hasPrev = skip > 0

  let prevOffset: number | undefined = undefined

  if (hasPrev) {
    if (!take) {
      throw new Error("take is missing")
    }

    prevOffset = skip - take

    if (prevOffset < 0) {
      prevOffset = 0
    }
  }

  return {
    items,
    meta: {
      hasMoreItems: hasMore,
      hasPrevItems: hasPrev,
      currentOffset: skip,
      nextOffset: hasMore ? skip + (take || 0) : undefined,
      prevOffset,
      totalItems: totalCount,
    },
  }
}

export class CursorPaginationDTO {
  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional({
    type: Number,
    description: "Forward navigation: The number of items to fetch",
  })
  @Type(() => Number)
  first?: number | null | undefined

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional({
    type: Number,
    description: "Backwards navigation: The number of items to fetch",
  })
  @Type(() => Number)
  last?: number | null | undefined

  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional({
    type: String,
    description:
      "Backwards navigation: The cursor (id of an item) before which the selection is started",
  })
  before?: string | null | undefined

  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional({
    type: String,
    description:
      "Forward navigation: The cursor (id of an item) after which the selection is started",
  })
  after?: string | null | undefined
}

export class CursorPageInfoDTO {
  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional({ type: String })
  startCursor?: string | null | undefined

  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional({ type: String })
  endCursor?: string | null | undefined

  @IsBoolean()
  @Expose()
  @ApiProperty()
  hasNextPage!: boolean

  @IsBoolean()
  @Expose()
  @ApiProperty()
  hasPreviousPage!: boolean
}

export abstract class ListResultDTO<T extends { id: string }> {
  abstract items: T[]

  @Expose()
  @ApiProperty()
  totalCount!: number

  @Expose()
  @ApiProperty({ type: CursorPageInfoDTO })
  pageInfo!: CursorPageInfoDTO
}
