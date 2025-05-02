import { BaseRpcContext } from "@nestjs/microservices"
import { JsMsg, Msg } from "nats"

export class NatsContext extends BaseRpcContext<[Msg]> {
  constructor(args: [Msg]) {
    super(args)
  }

  get message(): Msg {
    return this.args[0]
  }
}

export class NatsJetStreamContext extends BaseRpcContext<[JsMsg]> {
  constructor(args: [JsMsg]) {
    super(args)
  }

  get message(): JsMsg {
    return this.args[0]
  }

  get subject(): string {
    return this.message.subject
  }
}
