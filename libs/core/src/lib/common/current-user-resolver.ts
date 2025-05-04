import { ExecutionContext, Injectable } from '@nestjs/common';
import { CurrentUserDTO, TRANSFORM_OPTIONS } from '@pros-on-work/resources';
import { plainToInstance } from 'class-transformer';
import { MsgHdrs } from 'nats';

import { NatsContext } from '../nats-transport/context';

@Injectable()
export class CurrentUserResolver {
  resolve(ctx: ExecutionContext): CurrentUserDTO | null {
    if (ctx.getType() === 'http') {
      const req = ctx.switchToHttp().getRequest();
      return req.user;
    }

    if (ctx.getType() === 'rpc') {
      const rpc = ctx.switchToRpc().getContext<NatsContext>();
      const headers = rpc.message?.headers;
      if (!headers) return null;
      return resolveUserFromRpc(headers);
    }

    return null;
  }
}

export function resolveUserFromRpc(headers: MsgHdrs) {
  const userHeader = headers.get('user');
  if (userHeader) {
    const user = JSON.parse(headers.get('user')) as CurrentUserDTO;
    return plainToInstance(CurrentUserDTO, user, TRANSFORM_OPTIONS);
  }

  return null;
}
