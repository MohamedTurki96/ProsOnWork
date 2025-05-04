import { join } from 'path';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Module,
  Response,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiExcludeController, ApiResponse } from '@nestjs/swagger';
import { DatabaseModule, ProsOnWorkCoreModule } from '@pros-on-work/core';
import type { Response as ExpressResponse } from 'express';

import { createPrismaClient } from './db';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';

@Module({
  imports: [
    ProsOnWorkCoreModule.forRoot({
      health: {
        database: { enabled: false },
        nats: { enabled: true },
      },
    }),
    DatabaseModule.forPrisma(createPrismaClient()),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'media'),
      exclude: ['/files/(.*)'],
      serveStaticOptions: {
        redirect: false,
        index: false,
        dotfiles: 'allow',
        setHeaders: (res: any) => {
          res.set('Access-Control-Allow-Origin', '*');
        },
      },
    }),
  ],
  providers: [FileService],
  controllers: [getSwaggerDocsController(), FileController],
})
export class UserServiceModule {}

export function getSwaggerDocsController() {
  @Controller()
  @ApiExcludeController()
  class SwaggerDocsController {
    @Get()
    @HttpCode(HttpStatus.PERMANENT_REDIRECT)
    @ApiResponse({ status: HttpStatus.PERMANENT_REDIRECT })
    get(@Response() res: ExpressResponse) {
      res.redirect('docs');
    }
  }

  return SwaggerDocsController;
}
