import { EventPattern as OrigEventPattern } from "@nestjs/microservices"
import { EventSerializer, IEvent, Type } from "@pros-on-work/utils"

export function EventPattern(event: Type<IEvent> | string): MethodDecorator {
  if (typeof event === "string") {
    return OrigEventPattern(event)
  } else {
    const meta = EventSerializer.fromClass(event)

    if (!meta) {
      throw new Error(
        `Event [${event.name}] is not decorated with @SerializeableEvent. Cant read event meta!`
      )
    }

    return OrigEventPattern(meta.eventName)
  }
}
