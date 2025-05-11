import { Module } from '@nestjs/common';

import smtpConfiguration, { SMPT_CONFIG } from './config';
import { EmailService } from './service';

export interface SmtpSettings {
  host: string;
  port: number;
  username: string;
  password: string;
}

@Module({
  imports: [],
  providers: [
    EmailService,
    {
      provide: SMPT_CONFIG,
      useFactory: smtpConfiguration,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
