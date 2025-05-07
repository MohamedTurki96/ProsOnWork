import { Type } from "@nestjs/common"
import { plainToInstance, Transform } from "class-transformer"
import { Matches } from "class-validator"
import Decimal from "decimal.js"

import { TRANSFORM_OPTIONS } from "./constants"

/* type ValidateFunc = (value: any) => boolean

export function OneOf(validators: ValidateFunc[]): PropertyDecorator {
  return function (target: Type, propertyName: PropertyKey) {
    registerDecorator({
      name: "oneOf",
      target: target.constructor,
      propertyName: propertyName.toString(),
      validator: {
        validate(value) {
          return validators.some((validate) => validate(value))
        },
        defaultMessage(args) {
          return `${args.property} needs to be oneOf defined types`
        },
      },
    })
  }
} */

export function TransformCondition<T = any>(
  validate: (e: T) => Type
): PropertyDecorator {
  return Transform(
    ({ value }) => {
      if (Array.isArray(value)) {
        return value.map((v) =>
          plainToInstance(validate(v), v, TRANSFORM_OPTIONS)
        )
      }

      return plainToInstance(validate(value), value, TRANSFORM_OPTIONS)
    },
    { toClassOnly: true }
  )
}

/**
 * Transform arrays with length from 1 set by query correctly.
 */
export function TransformArray(): PropertyDecorator {
  return Transform(({ value }) => {
    if (value === undefined || value === null) {
      return value
    }

    if (typeof value === "object") {
      return Object.values(value)
    }

    if (!Array.isArray(value)) {
      return [value]
    }
    return value
  })
}

export function TransformBoolean(): PropertyDecorator {
  return Transform(
    ({ value }) => {
      if (typeof value === "undefined") {
        return undefined
      }

      if (value === null) {
        return null
      }

      if (typeof value === "string") {
        return value === "true" || value === "1"
      }

      if (typeof value === "boolean") {
        return value
      }

      return Boolean(value)
    },
    { toClassOnly: true }
  )
}

export function TransfromDecimal() {
  return Transform(
    ({ value }) =>
      value
        ? new Decimal(
            typeof value === "object" ? value?.d?.join(".") : value
          ).toNumber()
        : undefined,
    { toClassOnly: true }
  )
}

export function getResourceChanges(
  oldObj: any,
  newObj: any,
  path?: string
): [key: string, value: { oldValue: string; newValue: string }][] {
  let toReturn: [key: string, value: { oldValue: string; newValue: string }][] =
    []

  for (const key in oldObj as object) {
    const curr = oldObj[key]

    if (typeof curr === "object" && curr !== null) {
      toReturn = toReturn.concat(getResourceChanges(curr, newObj[key], key))
      continue
    }

    if (curr !== newObj[key]) {
      const toSafe = [
        path ? path + "." + key : key,
        { oldValue: curr, newValue: newObj[key] },
      ]

      toReturn.push(toSafe as any)
    }
  }

  // Add properties that were added in the new object
  for (const key in newObj as object) {
    const curr = newObj[key]

    if (!oldObj[key]) {
      const toSafe = [
        path ? path + "." + key : key,
        { oldValue: undefined, newValue: curr },
      ]

      toReturn.push(toSafe as any)
    }
  }

  return toReturn
}

export function IsKey(): PropertyDecorator {
  return Matches(/^([a-z\d]+-)*[a-z\d]+$/, {
    message:
      "Invalid key format. Please ensure the key consists of lowercase letters only, separated by dashes (-), with no spaces or special characters allowed.",
  })
}
