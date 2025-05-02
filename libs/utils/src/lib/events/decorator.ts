import { EVENT_SERIALIZE_DATA } from "./constants"
import type { EventOptions } from "./interfaces"
import type { EventMetaType } from "./serializer"

function setMetaData(
  options: EventOptions,
  type: EventMetaType
): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(
      EVENT_SERIALIZE_DATA,
      {
        ...options,
        type,
      },
      target
    )
    return target
  }
}

export function SerializeableCommand(options: EventOptions): ClassDecorator {
  return setMetaData(options, "command")
}

export function SerializeableEvent(options: EventOptions): ClassDecorator {
  return setMetaData(options, "event")
}

export function SerializeableQuery(options: EventOptions): ClassDecorator {
  return setMetaData(options, "query")
}

export function SerializeableQueueJob(options: EventOptions): ClassDecorator {
  return setMetaData(options, "queue")
}
