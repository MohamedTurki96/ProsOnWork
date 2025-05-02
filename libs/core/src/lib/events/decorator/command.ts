import { MessagePattern } from "@nestjs/microservices"
import { EventSerializer, ICommand, Type } from "@pros-on-work/utils"

export function CommandPattern(
  event: Type<ICommand> | string
): MethodDecorator {
  if (typeof event === "string") {
    return MessagePattern(event)
  } else {
    const meta = EventSerializer.fromClass(event)

    if (!meta) {
      throw new Error(
        `Command [${event.name}] is not decorated with @SerializeableCommand. Cant read command meta!`
      )
    }

    return MessagePattern(meta.eventName)
  }
}
