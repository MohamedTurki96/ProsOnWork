import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Handlebars from 'handlebars';
import nodemailer from "nodemailer"

import { InjectableLogger } from '../logger/pino';

import { SMPT_CONFIG, SMTPConfig } from './config';
import { getEmailLayout } from './templates/partials/getEmailLayout';
import { EmailAttachment, EmailTemplate, SendMailOptions } from './types';

@Injectable()
export class EmailService {
  constructor(
    private logger: InjectableLogger,
    @Inject(SMPT_CONFIG) private readonly config: SMTPConfig,
  ) {
    Handlebars.registerPartial('pros-on-work-layout', getEmailLayout());
  }

  public async sendMail(options: SendMailOptions): Promise<void> {
    const { attachments, recepient, template, templateValues } = options;

    if (!recepient || !template.subject) {
      throw new BadRequestException(
        'Cannot send recepient and subject are required.',
      );
    }

    if (!template?.html && template?.text) {
      throw new BadRequestException(
        'Cannot send email. A template must be provided either as a text- and/or html-string.',
      );
    }

    if (attachments?.length) {
      attachments.forEach((attachment) => {
        this.validateAttachment(attachment);
      });
    }

    let { html, text, subject } = template;
    subject = this.parseTemplateValues(template.subject, templateValues);

    if (text) {
      text = this.parseTemplateValues(text, templateValues);
    }

    if (html) {
      html = this.parseTemplateValues(html, templateValues);
    }

    const from = this.config.username;

    const transport = await this.load();

    if (!transport) {
      throw new InternalServerErrorException(
        'Could not send email. No SMTP transport available.',
      );
    }

    this.logger.trace('Sending mail');
    await transport.sendMail({
      to: recepient,
      from,
      subject,
      html,
      text,
      attachments,
    });
  }

  public getTemplate(content: EmailTemplate): EmailTemplate {
    return {
      subject: content.subject,
      text: content.text,
      html: `
      {{#> pros-on-work-layout}}
        ${content.html}
      {{/pros-on-work-layout}}
      `,
    };
  }

  private parseTemplateValues(
    templateString: string,
    templateValues: Record<string, unknown> = {},
  ) {
    const template = Handlebars.compile(templateString);
    return template(templateValues);
  }

  private validateAttachment(attachment: EmailAttachment) {
    if (!attachment.content && !attachment.href) {
      throw new BadRequestException(
        'An email attachment needs to either have a content (Buffer) oder href (url) property.',
      );
    }
  }

  private async load() {
    const { host, port, username, password } = this.config;

    return nodemailer.createTransport({
      host,
      port,
      secure: false,
      requireTLS: false,
      tls: { rejectUnauthorized: false },
      auth: {
        user: username,
        pass: password,
      },
    });
  }
}
