import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import { CurrentUserResolver } from './current-user-resolver';

const resolver = new CurrentUserResolver();

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user = resolver.resolve(ctx);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  },
);
