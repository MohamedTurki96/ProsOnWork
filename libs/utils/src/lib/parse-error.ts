export interface ProsOnWorkHttpError {
  statusCode: number
  timestamp: string
  path: string
  message: string
}

export function parseHttpError(
  error: Error | string
): ProsOnWorkHttpError | undefined {
  const message = typeof error === "object" ? error.message : error

  if (!message) {
    return undefined
  }

  try {
    const httpError = JSON.parse(message)

    if (
      typeof httpError === "object" &&
      "statusCode" in httpError &&
      "timestamp" in httpError &&
      "path" in httpError &&
      "message" in httpError
    ) {
      return httpError
    }
  } catch {
    // Failed to parse JSON. Fallthrough and return undefined.
  }

  return undefined
}
