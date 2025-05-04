import { DynamicModule } from '@nestjs/common';
import { ConnectionOptions } from 'nats';

import { NatsClient } from './client';
import { NATS_CONNECTION_OPTIONS } from './constants';

export class NatsTransportModule {
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: NatsTransportModule,
      providers: [
        { provide: NATS_CONNECTION_OPTIONS, useValue: options },
        NatsClient,
      ],
      exports: [NatsClient],
    };
  }
}
