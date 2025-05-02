import { isObject } from "class-validator"

export function isErrorCode(e: unknown, errorCode: number) {
  return isObject(e) && "status" in e && Number(e.status) === errorCode
}

/**
 * Validates if passed error is an server error (status >= 500)
 */
export function isServerError(e: unknown) {
  return isObject(e) && "status" in e && Number(e.status) >= 500
}

export function isRequestTimeoutError(e: unknown) {
  return isErrorCode(e, 408)
}

export function isNotFoundError(e: unknown) {
  return isErrorCode(e, 404)
}
