import { DynamicModule, Module } from '@nestjs/common';
import { ConfigFactory, ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { filterUndefined } from '@pros-on-work/utils';
import { ClsModule } from 'nestjs-cls';

import { ContextInterceptor } from './common/context.interceptor';
import { CurrentUserResolver } from './common/current-user-resolver';
import { ExceptionFilter } from './common/exception.filter';
import { EventModule } from './events';
import { HealthModule, HealthModuleOptions } from './health/module';
import { LoggerModule } from './logger/module';
import type { PrometheusOptions } from './metrics/interfaces';
import { MetricsModule } from './metrics/module';

export interface ProsOnWorkModuleOptions {
  configs?: Array<ConfigFactory>;
  metrics?: PrometheusOptions;
  health?: HealthModuleOptions;
}

@Module({})
export class ProsOnWorkCoreModule {
  static forRoot(options: ProsOnWorkModuleOptions): DynamicModule {
    return {
      module: ProsOnWorkCoreModule,
      imports: [
        LoggerModule.register(),
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.local', '.env'],
          cache: true,
          load: [...(options?.configs || [])],
        }),
        ClsModule.forRoot({
          global: true,
          interceptor: { mount: false },
          middleware: { mount: false },
        }),
        EventModule,
        MetricsModule.register(options?.metrics),
        HealthModule.register(options?.health),
      ].filter(filterUndefined),
      providers: [
        ExceptionFilter,
        CurrentUserResolver,
        {
          provide: APP_INTERCEPTOR,
          useClass: ContextInterceptor,
        },
      ],
    };
  }
}
