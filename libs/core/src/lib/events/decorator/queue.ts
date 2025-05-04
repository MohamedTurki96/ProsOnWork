import { EventPattern as OrigEventPattern } from "@nestjs/microservices"
import { EventOptions, EventSerializer } from "@pros-on-work/utils"

export function QueuePattern(event: EventOptions | string): MethodDecorator {
  if (typeof event === "string") {
    return OrigEventPattern(event)
  } else {
    return OrigEventPattern(EventSerializer.toQueueName(event))
  }
}
