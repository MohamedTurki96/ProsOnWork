import { Injectable, LoggerService } from "@nestjs/common"

import { PinoLogger } from "./pino"

/*
A custom logger for NestJS, which uses the PinoLogger under the hood.

Log level mapping (Nest.js Logger method -> pino log level (number)):
verbose -> trace (10)
debug -> debug (20)
log -> info (30)
warn -> warn (40)
error -> error (50)
*/

@Injectable()
export class NestLogger implements LoggerService {
  private logger: PinoLogger

  constructor() {
    this.logger = new PinoLogger()
  }

  // Nest will supply context about its log lines as the first param.
  // e.g. message: 'DiscoveryModule dependencies initialized', optionalParams: [ 'InstanceLoader' ]

  verbose(message: any, ...optionalParams: any[]) {
    const [context, ...args] = optionalParams
    this.logger.trace({ context }, `[${context}] ${message}`, ...args)
  }

  debug(message: any, ...optionalParams: any[]) {
    const [context, ...args] = optionalParams
    this.logger.debug({ context }, `[${context}] ${message}`, ...args)
  }

  log(message: any, ...optionalParams: any[]) {
    const [context, ...args] = optionalParams
    this.logger.info({ context }, `[${context}] ${message}`, ...args)
  }

  warn(message: any, ...optionalParams: any[]) {
    const [context, ...args] = optionalParams
    this.logger.warn({ context }, `[${context}] ${message}`, ...args)
  }

  error(message: any, ...optionalParams: any[]) {
    const [context, ...args] = optionalParams
    this.logger.error({ context }, `[${context}] ${message}`, ...args)
  }
}
