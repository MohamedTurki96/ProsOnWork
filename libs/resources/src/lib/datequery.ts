import { ApiPropertyOptional } from "@nestjs/swagger"
import {
  createValueFromDateCode,
  isDateCode,
  IsDateOrDateCode,
} from "@pros-on-work/utils"
import { Expose, Transform, Type } from "class-transformer"
import { IsOptional } from "class-validator"

export function DateDecorator(): PropertyDecorator {
  return (...args) => {
    IsOptional()(...args)
    Expose()(...args)
    IsDateOrDateCode()(...args)
    Type((v) =>
      isDateCode(v.object[typeof args[1] === "string" ? args[1] : ""])
        ? String
        : Date
    )(...args)
    Transform(({ value }) => {
      if (isDateCode(value)) {
        return createValueFromDateCode(value).toDate()
      }

      return value
    })(...args)
    ApiPropertyOptional({
      oneOf: [{ type: "string", format: "date-time" }, { type: "string" }],
    })(...args)
  }
}

export class DateQuery {
  @DateDecorator()
  gt?: Date
  @DateDecorator()
  gte?: Date
  @DateDecorator()
  lt?: Date
  @DateDecorator()
  lte?: Date
  @DateDecorator()
  equals?: Date
}

export function UnparsedDateDecorator(): PropertyDecorator {
  return (...args) => {
    IsOptional()(...args)
    IsDateOrDateCode()(...args)
    Type((v) =>
      isDateCode(v.object[typeof args[1] === "string" ? args[1] : ""])
        ? String
        : Date
    )(...args)
    Expose()(...args)
    ApiPropertyOptional({
      oneOf: [{ type: "string", format: "date-time" }, { type: "string" }],
    })(...args)
  }
}

export class UnparsedDateQuery {
  @UnparsedDateDecorator()
  gt?: Date | string
  @UnparsedDateDecorator()
  gte?: Date | string
  @UnparsedDateDecorator()
  lt?: Date | string
  @UnparsedDateDecorator()
  lte?: Date | string
  @UnparsedDateDecorator()
  equals?: Date | string
}
