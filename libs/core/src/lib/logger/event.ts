import {
  CallHandler,
  CanActivate,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { NatsContext, NatsJetStreamContext } from '../nats-transport/context';
import { getMessageInfo } from '../nats-transport/utils';

import { InjectableLogger } from './pino';

@Injectable()
export class EventLogger implements NestInterceptor {
  constructor(private readonly logger: InjectableLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'rpc') {
      return next.handle();
    }

    const start = Date.now();
    const ctx = context
      .switchToRpc()
      .getContext<NatsContext | NatsJetStreamContext>();
    const topic = ctx.message.subject;

    return next.handle().pipe(
      catchError((err) => {
        this.logger.error(
          { responseTime: Date.now() - start, event: topic, err },
          `Failed to process ${topic}`,
        );
        return throwError(() => err);
      }),
      tap(() => {
        this.logger.info(
          { responseTime: Date.now() - start, event: topic },
          `Successfully processed ${topic}`,
        );
      }),
    );
  }
}

@Injectable()
export class EventLoggerGuard implements CanActivate {
  constructor(private logger: InjectableLogger) {}

  canActivate(context: ExecutionContext) {
    if (context.getType() !== 'rpc') {
      return true;
    }

    const ctx = context
      .switchToRpc()
      .getContext<NatsContext | NatsJetStreamContext>();

    const topic = ctx.message.subject;

    this.logger.trace(
      {
        message: getMessageInfo(ctx.message),
        event: topic,
        handler: `${context.getClass().name}.${context.getHandler().name}`,
      },
      `Received ${topic}`,
    );

    return true;
  }
}
