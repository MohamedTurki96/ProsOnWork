import { plainToInstance } from "class-transformer"

import { EVENT_SERIALIZE_DATA } from "./constants"
import { EventOptions, ICommand, IEvent, IQuery } from "./interfaces"
import { Type } from "../interfaces"
import { getClass } from "../get-class"

export type EventMetaType = "command" | "event" | "query" | "queue"
export class EventMetaObject implements EventOptions {
  msp?: string | undefined
  resource!: string
  action!: string
  type!: EventMetaType

  get eventName(): string {
    return EventSerializer.toEventName(this)
  }
}

export class EventSerializer {
  static fromClass(event: Type): EventMetaObject {
    return plainToInstance(
      EventMetaObject,
      Reflect.getMetadata(EVENT_SERIALIZE_DATA, event)
    )
  }

  static fromInstance(event: IEvent | IQuery | ICommand) {
    const classObj = getClass(event)

    if (!classObj) {
      throw new Error("No class given")
    }

    const meta = EventSerializer.fromClass(classObj)

    meta.msp = event["msp"] || meta.msp
    meta.action = event["action"] || meta.action
    meta.resource = event["resource"] || meta.resource

    return meta
  }

  static toEventName(
    obj: Omit<EventMetaObject, "eventName">,
    withoutType?: boolean
  ) {
    let result = withoutType ? "" : obj.type.toLowerCase()

    const extend = (value?: string) => {
      if (value) {
        if (result.length) {
          result += `.${value.toLowerCase()}`
        } else {
          result = value.toLowerCase()
        }
      }
    }

    extend(obj.msp)
    extend(obj.resource)
    extend(obj.action)

    return result
  }

  static toQueueName(obj: EventOptions) {
    return EventSerializer.toEventName({ ...obj, type: "queue" })
  }

  static getEventName(event: Type) {
    return EventSerializer.fromClass(event).eventName
  }

  static fromEventName(eventName: string): EventMetaObject {
    const split = eventName.split(".")

    let msp: string | undefined

    const type = split.shift() as EventMetaType

    if (split.length === 3) {
      msp = split.shift()
    }

    const resource = split.shift()!
    const action = split.shift()!

    return {
      type: type,
      msp,
      resource,
      action,
      eventName,
    }
  }

  static forAllMSP(event: Type) {
    return {
      ...EventSerializer.fromClass(event),
      msp: "*",
    }
  }
}
