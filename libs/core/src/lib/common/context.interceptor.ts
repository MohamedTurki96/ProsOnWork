import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';

import { CurrentUserResolver } from './current-user-resolver';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  constructor(
    private readonly resolver: CurrentUserResolver,
    private readonly cls: ClsService,
  ) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const user = this.resolver.resolve(ctx);

    return this.cls.run(() => {
      this.cls.set('user', user);

      return next.handle();
    });
  }
}
