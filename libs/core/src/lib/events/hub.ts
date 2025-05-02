import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import {
  EventMetaObject,
  EventSerializer,
  ICommand,
  IEvent,
  IQuery,
  IQueueJob,
  getClass
} from "@pros-on-work/utils"
import { instanceToPlain } from "class-transformer"
import { EmptyError, lastValueFrom, timeout } from "rxjs"

import { InjectableLogger } from "../logger/pino"
import { NatsClient } from "../nats-transport/client"

import { parseError, retryOnServerError } from "./utils"

@Injectable()
export class EventHub implements OnModuleInit, OnModuleDestroy {
  constructor(
    private client: NatsClient,
    private logger: InjectableLogger,
  ) {}

  async onModuleInit() {
    await this.client.connect()
  }

  async onModuleDestroy() {
    await this.client.close()
  }

  async sendQuery<R>(query: IQuery, timeoutMs?: number): Promise<R> {
    const eventObj = EventSerializer.fromInstance(query)

    if (!eventObj) {
      const className = getClass(query)?.name

      throw new Error(
        `Query [${className}] is not decorated with @SerializeableQuery. Cant read query meta!`
      )
    }

    const payload = instanceToPlain(query)

    this.logger.debug(
      { event: eventObj, message: payload },
      `Sending query ${eventObj.eventName}`
    )

    return await this.send(eventObj.eventName, payload, timeoutMs)
  }

  async sendCommand<R>(command: ICommand, timeoutMs?: number): Promise<R> {
    const eventObj = EventSerializer.fromInstance(command)

    if (!eventObj) {
      const className = getClass(command)?.name

      throw new Error(
        `Command [${className}] is not decorated with @SerializeableCommand. Cant read command meta!`
      )
    }

    const payload = instanceToPlain(command)

    this.logger.debug(
      { event: eventObj, message: payload },
      `Sending command ${eventObj.eventName}`
    )

    return await this.send(eventObj.eventName, payload, timeoutMs)
  }

  async emitEvent(event: IEvent, disableLogging = false) {
    const eventObj = EventSerializer.fromInstance(event)

    if (!eventObj) {
      const className = getClass(event)?.name

      throw new Error(
        `Event [${className}] is not decorated with @SerializeableEvent. Cant read event meta!`
      )
    }

    const payload = instanceToPlain(event)

    if (!disableLogging) {
      this.logger.debug(
        { event: eventObj, message: payload },
        `Emitting event ${eventObj.eventName}`
      )
    }

    await this.emit(eventObj.eventName, payload)
  }

  async addQueueJob(event: IQueueJob) {
    // Currently specific for queues to overwrite msp
    const eventObj = EventSerializer.fromInstance(event)

    if (!eventObj) {
      const className = getClass(event)?.name

      throw new Error(
        `Event [${className}] is not decorated with @SerializeableQueueJob. Cant read event meta!`
      )
    }

    const payload = instanceToPlain(event)

    this.logger.debug(
      { event: eventObj, message: payload },
      `add queue job ${eventObj.eventName}`
    )

    await this.emit(eventObj.eventName, payload)
  }

  async emitGeneric<R>(
    direction: Omit<EventMetaObject, "eventName">,
    payload: object
  ): Promise<R>
  async emitGeneric(
    direction: Omit<EventMetaObject, "eventName">,
    payload: object
  ): Promise<void> {
    const eventName = EventSerializer.toEventName(direction)

    this.logger.debug({ event: eventName }, "Emitting generic event")

    if (direction.type === "event" || direction.type === "queue") {
      return await this.emit(eventName, { payload })
    } else {
      return await this.send(eventName, { payload })
    }
  }

  private async send(eventName: string, payload: unknown, timeoutMs?: number) {
    return lastValueFrom(
      this.client
        .send(eventName, payload)
        .pipe(
          timeout(timeoutMs || 5000),
          parseError(eventName),
          retryOnServerError()
        )
    ).catch((err) => {
      if (err instanceof EmptyError) {
        return
      }
      throw err
    })
  }

  private async emit(eventName: string, payload: unknown) {
    return await lastValueFrom(this.client.emit(eventName, payload))
  }
}
