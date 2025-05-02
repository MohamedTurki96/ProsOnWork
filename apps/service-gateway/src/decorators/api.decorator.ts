import { applyDecorators, Get, HttpCode, HttpStatus } from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from "@nestjs/swagger"
import { Type } from "@pros-on-work/utils"


type ApiListQueryOptions = {
  response: Type
  where: Type
  sort?: Type
  paginationType?: "offset" | "cursor"
  path?: string | string[]
}

export function ApiNeedsAuthentication() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: "Unauthorized" })
  )
}

export function ApiListQuery({
  sort,
  response,
  where,
  paginationType = "offset",
  path = "",
}: ApiListQueryOptions) {
  const swaggerDecorator = [
    sort
      ? ApiQuery({
          required: false,
          style: "deepObject",
          name: "sort",
          explode: true,
          type: "object",
          schema: {
            $ref: getSchemaPath(sort),
          },
        })
      : undefined,
    ApiQuery({
      required: false,
      style: "deepObject",
      name: "where",
      explode: true,
      type: "object",
      schema: {
        $ref: getSchemaPath(where),
      },
    }),
    ...(paginationType === "offset"
      ? [
          ApiQuery({ name: "skip", type: Number, required: false }),
          ApiQuery({ name: "take", type: Number, required: false }),
        ]
      : [
          ApiQuery({
            name: "first",
            type: Number,
            required: false,
            description: "Forward navigation: The number of items to fetch",
          }),
          ApiQuery({
            name: "last",
            type: Number,
            required: false,
            description: "Backwards navigation: The number of items to fetch",
          }),
          ApiQuery({
            name: "before",
            type: String,
            required: false,
            description:
              "Backwards navigation: The cursor (id of an item) before which the selection is started",
          }),
          ApiQuery({
            name: "after",
            type: String,
            required: false,
            description:
              "Forward navigation: The cursor (id of an item) after which the selection is started",
          }),
        ]),
  ].filter(Boolean) as MethodDecorator[]

  return applyDecorators(
    sort ? ApiExtraModels(where, sort) : ApiExtraModels(where),
    Get(path),
    HttpCode(HttpStatus.OK),
    ApiResponse({
      status: HttpStatus.OK,
      type: response,
    }),
    ...swaggerDecorator
  )
}
