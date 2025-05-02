process.on('uncaughtException', function (err) {
  console.error('Uncaught exception', err);
});

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupApp } from '@pros-on-work/core';
import { ServerURL } from '@pros-on-work/utils';
import { RetentionPolicy, StorageType } from 'nats';

const modLoader = () => import('./module').then((d) => d.UserServiceModule);

setupApp(modLoader, {
  rootPath: __dirname,
  streams: [
    {
      name: 'file-events',
      subjects: ['event.file.*'],
      storage: StorageType.File,
      retention: RetentionPolicy.Interest,
      max_age: 3 * 24 * 60 * 60 * 10 ** 9, // 3 days in nano seconds
    },
  ],
}).then(({ app, listen }) => {
  app.enableCors()
  setupApiSwagger(app)
  listen();
});

export function setupApiSwagger(app: INestApplication) {
  const docBuilder = new DocumentBuilder()
    .setTitle('ProsOnWork Files Gateway')
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
    swaggerOptions: { tagsSorter: 'alpha', withCredentials: true },
  });
}
