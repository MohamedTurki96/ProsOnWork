import {
  DynamicModule,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common"
import pinoHttp from "pino-http"

import { EventLogger, EventLoggerGuard } from "./event"
import { NestLogger } from "./nest"
import { InjectableLogger, PINO_ROOT_INSTANCE, PinoLogger } from "./pino"

@Global()
@Module({
  exports: [
    InjectableLogger,
    NestLogger,
    PinoLogger,
    EventLogger,
    EventLoggerGuard,
  ],
  providers: [
    InjectableLogger,
    NestLogger,
    PinoLogger,
    EventLogger,
    EventLoggerGuard,
  ],
})
export class LoggerModule implements NestModule {
  static register(): DynamicModule {
    return {
      module: LoggerModule,
      exports: [
        InjectableLogger,
        NestLogger,
        PinoLogger,
        EventLogger,
        EventLoggerGuard,
      ],
      providers: [
        InjectableLogger,
        NestLogger,
        PinoLogger,
        EventLogger,
        EventLoggerGuard,
      ],
    }
  }

  configure(consumer: MiddlewareConsumer) {
    const httpLogger = pinoHttp({
      logger: PINO_ROOT_INSTANCE,
      quietReqLogger: true,
      redact: {
        paths: [
          "*.headers.authorization",
          "*.headers.cookie",
          "*.headers['set-cookie']",
        ],
      },
      customSuccessMessage: function (req) {
        return `${req.method?.toUpperCase()} ${req.url
          ?.split("?")
          .shift()} completed`
      },
      customErrorMessage: function (req) {
        return `${req.method?.toUpperCase()} ${req.url
          ?.split("?")
          .shift()} failed`
      },
      customReceivedMessage: function (req) {
        return `${req.method?.toUpperCase()} ${req.url
          ?.split("?")
          .shift()} incoming`
      },
      autoLogging: {
        ignore: (req) => {
          if (req.url === "/health" || req.url === "/metrics") {
            return true
          }
          return false
        },
      },
    })

    consumer
      .apply(httpLogger)
      .exclude({ path: "metrics", method: RequestMethod.GET })
      .forRoutes({ path: "*", method: RequestMethod.ALL })
  }
}
