process.on('uncaughtException', function (err) {
  console.error('Uncaught exception', err);
});

import { INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupApp } from '@pros-on-work/core';
import { ServerURL } from '@pros-on-work/utils';

import { JwtAuthGuard } from './guards/auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';

const modLoader = () => import('./module').then((d) => d.GatewayModule);

setupApp(modLoader, {
  rootPath: __dirname,
}).then(async ({ app, listen }) => {
  enableCors(app);
  setupApiSwagger(app);

  app.useGlobalGuards(
    new JwtAuthGuard(app.get(Reflector)),
    new RolesGuard(app.get(Reflector)),
  )


  listen();
});

export function enableCors(app: INestApplication) {
  app.enableCors({
    credentials: true,
    origin: (_requestOrigin, callback) => {
      callback(null, /https?:\/\/(127\.0\.0\.1|localhost)(:[0-9]+)?/);
    },
  });
}

export function setupApiSwagger(app: INestApplication) {
  const docBuilder = new DocumentBuilder()
    .setTitle('ProsOnWork Gateway')
    .addBearerAuth()
    .setVersion(process.env['APP_VERSION']!)
    .addServer(ServerURL.get);

  const docConfig = docBuilder.build();

  const document = SwaggerModule.createDocument(app, docConfig, {
    include: [],
    deepScanRoutes: true,
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  });

  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: false,
    jsonDocumentUrl: "docs/docs.json",
    swaggerOptions: { tagsSorter: 'alpha', withCredentials: true },
  });
}
