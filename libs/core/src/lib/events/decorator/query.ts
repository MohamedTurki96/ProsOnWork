import { MessagePattern } from "@nestjs/microservices"
import { EventSerializer, IQuery, Type } from "@pros-on-work/utils"

export function QueryPattern(event: Type<IQuery> | string): MethodDecorator {
  if (typeof event === "string") {
    return MessagePattern(event)
  } else {
    const meta = EventSerializer.fromClass(event)

    if (!meta) {
      throw new Error(
        `Query [${event.name}] is not decorated with @SerializeableQuery. Cant read query meta!`
      )
    }

    return MessagePattern(meta.eventName)
  }
}
