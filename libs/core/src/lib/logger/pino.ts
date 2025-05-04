import { Inject, Injectable, Optional, Scope } from "@nestjs/common"
import { INQUIRER } from "@nestjs/core"
import { getClassName } from "@pros-on-work/utils"
import pino, {
  Bindings,
  ChildLoggerOptions,
  type LogFn,
  type Logger,
} from "pino"
import type { PrettyOptions } from "pino-pretty"


export const PINO_ROOT_INSTANCE = pino({
  base: undefined,
  level: "debug",
  formatters: {
    level: (label, number) => {
      return {
        level: label,
        levelVal: number,
      }
    },
  },
  transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "levelVal,trace_id,span_id,trace_flags",
        } satisfies PrettyOptions,
      },
})

@Injectable()
export class PinoLogger {
  protected logger: Logger

  constructor(
    @Optional()
    nameOrBindings?: string | Bindings,
    @Optional()
    options?: ChildLoggerOptions
  ) {
    this.logger = PINO_ROOT_INSTANCE.child(
      nameOrBindings === undefined || typeof nameOrBindings === "string"
        ? { context: nameOrBindings || "Global" }
        : nameOrBindings,
      nameOrBindings
        ? { ...options, msgPrefix: `[${nameOrBindings}] ` }
        : options
    )
  }

  private log(
    level: "trace" | "debug" | "info" | "warn" | "error",
    ...args: Parameters<LogFn>
  ) {
    // Extract object from log. If the first argument is not an object, create a new object.
    // The first argument can be an instance of an error class, in which case the object is moved to the err property.
    // Possible calls: log({ foo: bar }), log(new Error()), log("message")
    let obj = typeof args[0] === "object" ? args.shift() : {}
    if (obj instanceof Error) {
      obj = { err: obj }
    }

    /* Transform arrays to objects, because Loki does not display arrays
    in Logs. There is an open issue: https://github.com/grafana/loki/issues/8475.
    TODO: Once Loki supports arrays in JSON logs, remove this part. */
    obj = transformArrayValuesToObject(obj)


    this.logger[level](obj, ...args)
  }

  trace(msg: string, ...args: any[]): void
  trace(obj: unknown, msg?: string, ...args: any[]): void
  trace(...args: Parameters<LogFn>) {
    this.log("trace", ...args)
  }

  debug(msg: string, ...args: any[]): void
  debug(obj: unknown, msg?: string, ...args: any[]): void
  debug(...args: Parameters<LogFn>) {
    this.log("debug", ...args)
  }

  info(msg: string, ...args: any[]): void
  info(obj: unknown, msg?: string, ...args: any[]): void
  info(...args: Parameters<LogFn>) {
    this.log("info", ...args)
  }

  warn(msg: string, ...args: any[]): void
  warn(obj: unknown, msg?: string, ...args: any[]): void
  warn(...args: Parameters<LogFn>) {
    this.log("warn", ...args)
  }

  error(msg: string, ...args: any[]): void
  error(obj: unknown, msg?: string, ...args: any[]): void
  error(...args: Parameters<LogFn>) {
    this.log("error", ...args)
  }

  addBindings(bindings: Record<string, any>) {
    this.logger.setBindings(bindings)
  }
}

@Injectable({ scope: Scope.TRANSIENT })
export class InjectableLogger extends PinoLogger {
  constructor(
    @Inject(INQUIRER) parentClass: object,
  ) {

    super(
      getClassName(parentClass),
    )
    this.addBindings({ context: getClassName(parentClass) })
  }
}

export function transformArrayValuesToObject(obj: Record<string, unknown>) {
  if (Buffer.isBuffer(obj)) {
    return `buffer:${obj.length}`
  }

  /* Use cache to avoid errors caused by circluar json
    (Inspiration: https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format) */
  const cache: any[] = []

  const objString = JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (value instanceof Error) {
        return {
          message: value?.message,
          stack: value?.stack,
          name: value?.name,
        }
      }

      if (Buffer.isBuffer(value)) {
        return `buffer:${value.length}`
      }

      // Duplicate reference found, discard key%
      if (cache.includes(value)) return

      cache.push(value)
    }

    if (Array.isArray(value)) {
      return Object.assign({}, value)
    }
    return value
  })

  return JSON.parse(objString)
}
