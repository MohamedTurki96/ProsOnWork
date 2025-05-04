import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Module,
  Response,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiExcludeController, ApiResponse } from '@nestjs/swagger';
import { ProsOnWorkCoreModule } from '@pros-on-work/core';
import type { Response as ExpressResponse } from 'express';

import { Public } from './decorators/public.decorator';
import { JwtStrategy } from './guards/auth/jwt.strategy';
import { ReservationController } from './service-booking/reservation.controller';
import { CategoryController } from './service-catalog/category.controller';
import { ProductController } from './service-catalog/product.controller';
import { ShopController } from './service-catalog/shop.controller';
import { WorkerController } from './service-catalog/worker.controller';
import { ChatController } from './service-chat/chat.controller';
import { MessageController } from './service-chat/message.controller';
import { FeedbackController } from './service-feedback/feedback.controller';
import { ReclamationController } from './service-feedback/reclamation.controller';
import { AuthController } from './service-user/auth.controller';
import { UserController } from './service-user/user.controller';

@Module({
  imports: [
    ProsOnWorkCoreModule.forRoot({
      health: {
        database: { enabled: true },
        nats: { enabled: true },
      },
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy],
  controllers: [
    getSwaggerDocsController(),
    UserController,
    AuthController,
    CategoryController,
    ShopController,
    WorkerController,
    ProductController,
    ReservationController,
    FeedbackController,
    ReclamationController,
    ChatController,
    MessageController,
  ],
})
export class GatewayModule {}

export function getSwaggerDocsController() {
  @Controller()
  @ApiExcludeController()
  class SwaggerDocsController {
    @Get()
    @Public()
    @HttpCode(HttpStatus.PERMANENT_REDIRECT)
    @ApiResponse({ status: HttpStatus.PERMANENT_REDIRECT })
    get(@Response() res: ExpressResponse) {
      res.redirect('docs');
    }
  }

  return SwaggerDocsController;
}
