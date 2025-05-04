import {
  defer,
  lastValueFrom,
  Observable,
  ObservableInput,
  retry,
  throwError,
  timer,
} from "rxjs"

export interface RetryAsyncOptions {
  attempts?: number
  delay?: number
}

export function retryAsync<T>(
  observableFactory: () => ObservableInput<T>,
  onError?: (retryCount: number, error: Error) => void | boolean,
  options?: RetryAsyncOptions
) {
  return lastValueFrom(
    defer(observableFactory).pipe(handleRetry(onError, options))
  )
}

export function handleRetry(
  onError?: (retryCount: number, error: Error) => void | boolean,
  options?: RetryAsyncOptions
): <T>(source: Observable<T>) => Observable<T> {
  const { attempts, delay } = {
    attempts: 9,
    delay: 3000,
    ...options,
  }

  return <T>(source: Observable<T>) =>
    source.pipe(
      retry({
        count: attempts,
        delay: (error, counter) => {
          const shouldRetry = onError?.(counter, error)

          // If onError returns void, we want to retry
          if (counter + 1 >= attempts || shouldRetry === false) {
            return throwError(() => error)
          } else {
            return timer(counter * delay)
          }
        },
      })
    )
}
