import { BaseRpcContext } from '@nestjs/microservices';
import { CurrentUserDTO } from '@pros-on-work/resources';
import { JsMsg, Msg } from 'nats';

import { resolveUserFromRpc } from '../common/current-user-resolver';

export class NatsContext extends BaseRpcContext<[Msg]> {
  constructor(args: [Msg]) {
    super(args);
  }

  get message(): Msg {
    return this.args[0];
  }

  get user(): CurrentUserDTO | null {
    const headers = this.message.headers;

    if (!headers) {
      return null;
    }

    return resolveUserFromRpc(headers);
  }
}

export class NatsJetStreamContext extends BaseRpcContext<[JsMsg]> {
  constructor(args: [JsMsg]) {
    super(args);
  }

  get message(): JsMsg {
    return this.args[0];
  }

  get subject(): string {
    return this.message.subject;
  }

  get user(): CurrentUserDTO | null {
    const headers = this.message.headers;

    if (!headers) {
      return null;
    }

    return resolveUserFromRpc(headers);
  }
}
