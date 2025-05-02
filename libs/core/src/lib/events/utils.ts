import {
  RequestTimeoutException,
  ServiceUnavailableException,
} from "@nestjs/common"
import { isRequestTimeoutError, isServerError } from "@pros-on-work/utils"
import { ErrorCode, NatsError } from "nats"
import {
  catchError,
  Observable,
  retry,
  throwError,
  TimeoutError,
  timer,
} from "rxjs"

export function retryOnServerError(): <T>(
  source: Observable<T>
) => Observable<T> {
  return retry({
    count: 3,
    delay: (error, retryCount) =>
      // If response status > 500 or 408
      // Exponential backoff  (2^x * 1000)
      // attempt 1 = 2s
      // attempt 2 = 4s
      // attempt 3 = 8s
      isServerError(error) || isRequestTimeoutError(error)
        ? timer(2 ** retryCount * 1000)
        : throwError(() => error),
  })
}

export function parseError(
  eventName: string
): <T>(source: Observable<T>) => Observable<T> {
  return catchError((err) => {
    if (err instanceof TimeoutError) {
      throw new RequestTimeoutException()
    }

    if (err instanceof NatsError && err.code === ErrorCode.NoResponders) {
      throw new ServiceUnavailableException(
        `Service for '${eventName}' unavailable!`,
        { cause: err }
      )
    }

    throw err
  })
}
