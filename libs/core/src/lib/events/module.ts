import { Global, Module } from '@nestjs/common';

import { NatsTransportModule } from '../nats-transport/nats-transport.module';
import { loadNatsConnectionOptions } from '../nats-transport/nats.config';

import { EventHub } from './hub';

@Global()
@Module({
  imports: [NatsTransportModule.register(loadNatsConnectionOptions())],
  providers: [EventHub],
  exports: [EventHub],
})
export class EventModule {}
