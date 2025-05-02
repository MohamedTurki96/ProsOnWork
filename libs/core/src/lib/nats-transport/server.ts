import {
  CustomTransportStrategy,
  MessageHandler,
  Server,
} from "@nestjs/microservices"
import { isEqual } from "lodash"
import {
  AckPolicy,
  connect,
  ConnectionOptions,
  ConsumerConfig,
  JetStreamClient,
  JetStreamManager,
  JsMsg,
  JSONCodec,
  Msg,
  NatsConnection,
  StreamConfig,
} from "nats"
import { parseSemVer } from "nats/lib/nats-base-client/semver"

import { PinoLogger } from "../logger/pino"

import { NATS_JETSTREAM_TRANSPORT } from "./constants"
import { NatsContext, NatsJetStreamContext } from "./context"
import {
  getMessageInfo,
  isJetStreamMsg,
  matchSubject,
  sanitizeSubjectName,
} from "./utils"

export interface NatsJetStreamServerOptions {
  connection: ConnectionOptions
  namePrefix: string
  streams?: Partial<StreamConfig>[]
}

interface StreamHandler {
  subject: string
  handler: MessageHandler
}

export class NatsJetStreamServer
  extends Server
  implements CustomTransportStrategy
{
  readonly transportId = NATS_JETSTREAM_TRANSPORT

  private nc!: NatsConnection
  private js!: JetStreamClient
  private jsm!: JetStreamManager
  private codec = JSONCodec()

  constructor(private options: NatsJetStreamServerOptions) {
    super()
  }

  log = new PinoLogger(NatsJetStreamServer.name)

  async listen(callback: () => any) {
    this.nc = await connect(this.options.connection)
    this.js = this.nc.jetstream()
    this.jsm = await this.nc.jetstreamManager()

    // Make sure streams exist before subscribing to subjects.
    if (this.options.streams) {
      for (const streamConfig of this.options.streams) {
        await this.upsertStream(streamConfig)
      }
    }

    // Bind event and message handlers
    await this.bindEventHandlers()
    this.bindMessageHandlers()

    callback()
  }

  /**
   * Creates a stream with the given configuration. If the stream already exists, it will be updated.
   * @param config - The desired stream configuration
   * @returns The stream
   */
  async upsertStream(config: Partial<StreamConfig>) {
    const streams = await this.jsm.streams.list().next()
    const stream = streams.find((s) => s.config.name === config.name)

    if (stream) {
      const hasChanges = Object.keys(config).some(
        (key) =>
          !isEqual(
            config[key as keyof StreamConfig],
            stream.config[key as keyof StreamConfig]
          )
      )

      if (hasChanges) {
        const si = await this.jsm.streams.update(stream.config.name, config)
        this.log.debug(`Stream ${si.config.name} updated`)
        return si
      }
      return stream
    } else {
      const si = await this.jsm.streams.add(config)
      this.log.debug(`Stream ${si.config.name} created`)
      return si
    }
  }

  private isFilterSubjectsSupported() {
    if (!this.nc.info) {
      return false
    }
    // consumer 'filter_subjects' requires server 2.10.0
    const version = parseSemVer(this.nc.info.version)
    return version.major > 2 || (version.major === 2 && version.minor >= 10)
  }

  /**
   * Creates a consumer for the given stream. Updates the consumer, if it already exists.
   * @param stream The stream for which the consumer should be created
   * @param subjects A list of subjects, belonging to the stream, that the consumer is interested in
   * @returns The consumer
   */
  private async upsertConsumer(stream: string, subjects: string[]) {
    const name = `${this.options.namePrefix}_${stream}_consumer`
    const consumers = await this.jsm.consumers.list(stream).next()
    const existingConsumer = consumers.find((c) => c.name === name)

    const filter_subjects = this.isFilterSubjectsSupported()
      ? subjects
      : undefined

    const config: Partial<ConsumerConfig> = {
      durable_name: name,
      max_deliver: 3,
      ack_policy: AckPolicy.Explicit,
      filter_subjects,
    }

    if (!existingConsumer) {
      const ci = await this.jsm.consumers.add(stream, config)
      this.log.debug(`Consumer ${ci.name} created`)
      return ci
    } else {
      const hasChanges = Object.keys(config).some((key) => {
        if (key === "filter_subjects" && !this.isFilterSubjectsSupported()) {
          return false
        }

        return !isEqual(
          config[key as keyof ConsumerConfig],
          existingConsumer.config[key as keyof ConsumerConfig]
        )
      })

      if (!hasChanges) {
        this.log.debug(
          `Consumer ${existingConsumer.name} already exists - no changes detected`
        )
        return existingConsumer
      } else {
        const ci = await this.jsm.consumers.update(stream, name, config)
        this.log.debug(`Consumer ${existingConsumer.name} updated`)
        return ci
      }
    }
  }

  /**
   * Finds handlers that match the given subject.
   * @param handlers A list of handlers that may belong to subject
   * @param subject The subject of the incoming message
   * @returns A filtered list of handlers that match the subject
   */
  private findMatchingHandlers(handlers: StreamHandler[], subject: string) {
    return handlers.filter((h) => matchSubject(h.subject, subject))
  }

  // Events don't provide a response. There is one NATS JetStream consumer per stream.
  // Subjects, which don't belong to a JetStream stream fall back to NATS Core.
  private async bindEventHandlers() {
    // Maps stream names to a list of subjects that belong to the stream and their handlers.
    const streams = new Map<string, StreamHandler[]>()
    // Contains subjects that do not belong to a JetStream stream
    const coreSubjects = new Map<string, MessageHandler>()

    for (const [subject, handler] of this.messageHandlers) {
      // Skip message handlers. They are handled in bindMessageHandlers().
      if (!handler.isEventHandler) continue

      // Check if the subject belongs to a JetStream stream.
      const stream = await this.jsm.streams.find(subject).catch(() => undefined)
      if (stream) {
        if (!streams.has(stream)) {
          streams.set(stream, [])
        }
        const handlers = streams.get(stream)!
        handlers.push({ subject, handler })
      } else {
        coreSubjects.set(subject, handler)
      }
    }

    // Consume streams using NATS JetStream
    for (const [stream, handlers] of streams) {
      const ci = await this.upsertConsumer(
        stream,
        handlers.map((h) => h.subject)
      )
      const c = await this.js.consumers.get(stream, ci.name)

      await c.consume({
        max_messages: 1,
        callback: async (m) => {
          const streamHandlers = this.findMatchingHandlers(handlers, m.subject)

          await this.handleMessage(
            m,
            streamHandlers.map((h) => h.handler),
            true
          )
        },
      })

      this.log.debug(`Event consumer ${ci.name} started`)
    }

    // Consume core subjects using using NATS Core
    for (const [subject, handler] of coreSubjects) {
      // The name of the queue
      const name = `${this.options.namePrefix}_${sanitizeSubjectName(subject)}`

      this.nc.subscribe(subject, {
        queue: name,
        callback: async (err, m) => {
          if (err) {
            this.log.error({ err }, "Error while consuming messages")
            return
          }

          await this.handleMessage(m, [handler], true)
        },
      })

      this.log.debug(
        `Added event subscription for ${subject} with queue name ${name}`
      )
    }
  }

  // Messages follow the request -> response pattern and only utilize NATS Core.
  private bindMessageHandlers() {
    for (const [subject, handler] of this.messageHandlers) {
      // Skip event handlers. They are handled in bindEventHandlers()
      if (handler.isEventHandler) continue

      // The name of the  queue
      const name = `${this.options.namePrefix}_${sanitizeSubjectName(subject)}`

      // Consume messages using NATS Core
      this.nc.subscribe(subject, {
        queue: name,
        callback: async (err, m) => {
          if (err) {
            this.log.error({ err }, "Error while consuming messages")
            return
          }
          await this.handleMessage(m, [handler], false)
        },
      })

      this.log.debug(
        `Added message subscription for ${subject} with queue name ${name}`
      )
    }
  }

  private logHandleMessageError(
    err: unknown,
    m: Msg | JsMsg,
    msg = "Failed to handle incoming NATS event"
  ) {
    this.log.error(
      {
        err,
        message: getMessageInfo(m),
      },
      msg
    )
  }

  /**
   * Handles incoming NATS messages (both core and JetStream).
   * @param m The incoming message
   * @param handlers A list of handlers that match the subject of the incoming message
   * @param isEventHandler Whether this is an event handler (true) or a message handler (false)
   *
   * @description
   */
  private async handleMessage(
    m: Msg | JsMsg,
    handlers: MessageHandler[],
    isEventHandler: boolean
  ) {
    if (isJetStreamMsg(m) && !isEventHandler) {
      throw new Error("Message handlers do not support JetStream")
    }

    if (isJetStreamMsg(m)) {
      m.working()
    }

    // Verify that there is at least one handler for the event.
    if (handlers.length === 0) {
      if (this.isFilterSubjectsSupported()) {
        // This is just a fail safe and should never happen
        this.log.warn(`There is no handler for NATS event ${m.subject}`)
        if (isJetStreamMsg(m)) {
          m.term()
        }
      } else {
        // When filter_subjects is not supported, we might receive events in which
        // we are not interested. These events are just ignored.
        this.log.trace(`Ignoring NATS event ${m.subject}`)
        if (isJetStreamMsg(m)) {
          m.ack()
        }
      }
      return
    }

    try {
      const payload = this.codec.decode(m.data)
      const natsContext = isJetStreamMsg(m)
        ? new NatsJetStreamContext([m])
        : new NatsContext([m])

      // Call all handlers for the event.
      for (let i = 0; i < handlers.length; i++) {
        const handler = handlers[i]

        // Support observable responses. Note that await handler() does not throw,
        // but resolves to an observable, where possible errors are available under response.err.
        const response$ = this.transformToObservable(
          await handler(payload, natsContext)
        )
        this.send(response$, (response) => {
          // The handler (or one of its decorators / guards) might have thrown an error, in which case the global ExceptionFilter
          // kicks in (with host.getType() === "rpc") and converts the error.
          // Nest will provide the error in response.err, which is returned to the caller.
          if (isEventHandler) {
            if (response.err) {
              this.logHandleMessageError(response.err, m)
            }
          } else {
            try {
              // m must be of type msg, because isEventHandler is false
              (m as Msg).respond(this.codec.encode(response))
            } catch (err) {
              this.logHandleMessageError(
                err,
                m,
                "Failed to encode response"
              )
            }
          }
        })
          
      }

      if (isJetStreamMsg(m)) {
        m.ack()
      }
    } catch (err) {
      // Likely a decoding error at this point.
      this.logHandleMessageError(err, m)
      if (isJetStreamMsg(m)) {
        m.term()
      }
    }
  }

  async close() {
    await this.nc.drain()
  }
}
