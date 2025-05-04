import { Type } from "./interfaces"

export function getClass<T>(obj: any): Type<T> | undefined {
  if (!obj) {
    return undefined
  }

  if ("constructor" in obj) {
    return obj.constructor as Type<T>
  }
  return obj
}

export function getClassName(obj: any): string | undefined {
  return getClass(obj)?.name
}
