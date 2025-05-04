import { ClassSerializerInterceptor } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"
import { MicroserviceOptions } from "@nestjs/microservices"
import { NestExpressApplication } from "@nestjs/platform-express"
import { TRANSFORM_OPTIONS } from "@pros-on-work/resources"
import { Type } from "@pros-on-work/utils"
import { useContainer } from "class-validator"
import { upperFirst } from "lodash"

import { EventLogger, EventLoggerGuard } from "../logger/event"
import { NestLogger } from "../logger/nest"
import { PinoLogger } from "../logger/pino"
import { loadNatsConnectionOptions } from "../nats-transport/nats.config"
import { NatsJetStreamServer } from "../nats-transport/server"

import { ExceptionFilter } from "./exception.filter"
import { setupEnvironmentVariables } from "./setup-env"
import { SetupOptions } from "./setup.interfaces"
import { ClassValidationPipe } from "./validation.pipe"

const logger = new PinoLogger("Setup")

// todo: rename to setup-app
export async function setupApp(
  loadMod: () => Promise<Type>,
  options: SetupOptions
) {
  logger.trace("Load environment variables")
  await setupEnvironmentVariables(options)

  logger.trace("Load nest module")
  const mod = await loadMod()

  logger.trace("Load nest app")
  const app = await NestFactory.create<NestExpressApplication>(mod, {
    rawBody: true,
    bufferLogs: true,
  })

  logger.trace("Setup nest app")

  app.useLogger(app.get(NestLogger))

  app.disable("x-powered-by")

  app.enableShutdownHooks()

  app.useBodyParser("json", { limit: "50mb" })
  useContainer(app.select(mod), { fallbackOnErrors: true })

  app.useGlobalGuards(app.get(EventLoggerGuard))
  app.useGlobalInterceptors(app.get(EventLogger))
  // Called for outgoing responses (HTTP and microservice).
  // Converts DTOs to plain objects (instanceToPlain).
  // Extraneous values are excluded and undefined properties are not exposed.
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), TRANSFORM_OPTIONS)
  )
  // Called for every incoming request (HTTP and microservice).
  // Transforms icoming data (plainToInstance) to DTOs and validates them.
  // Extraneous values in the incoming data are forbidden and an error is thrown.
  app.useGlobalPipes(new ClassValidationPipe())
  app.useGlobalFilters(app.get(ExceptionFilter))

  app.connectMicroservice<MicroserviceOptions>(
    {
      strategy: new NatsJetStreamServer({
        connection: loadNatsConnectionOptions(),
        namePrefix: process.env["APP_NAME"]!,
        streams: options.streams,
      }),
    },
    {
      inheritAppConfig: true,
    }
  )

  const port = parseInt(process.env["PORT"]!, 10)

  async function listenService() {
    logger.trace("Start listening to nats")
    await app.startAllMicroservices()

    const appName = upperFirst(process.env["APP_NAME"])

    logger.trace("Start listening to requests")
    await app.listen(port, function listenCallback() {
      logger.info(`Started ${appName} on port ${port}`)
    })
  }

  return { app, listen: listenService, logger }
}
