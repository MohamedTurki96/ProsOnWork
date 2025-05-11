import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { EmailService, EventHub, EventPattern } from '@pros-on-work/core';
import {
  ResetPasswordRequestedDTO,
  ResetPasswordRequestedEvent,
  UserCreatedDTO,
  UserCreatedEvent,
  UserDTO,
  UserGetQuery,
} from '@pros-on-work/resources';
import { ServerURL } from '@pros-on-work/utils';

@Controller('Email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly eventHub: EventHub,
  ) {}

  @EventPattern(UserCreatedEvent)
  async onUserCreated(@Payload('payload') data: UserCreatedDTO) {
    const user = await this.eventHub.sendQuery<UserDTO>(new UserGetQuery(data));

    await this.emailService.sendMail({
      recepient: user.email,
      template: this.emailService.getTemplate({
        subject: 'Vérifiez votre adresse e-mail',
        html: `<p>Bonjour ${user.name ?? ''},</p>

        <p>Merci de vous être inscrit&nbsp;! Afin d'activer votre compte, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous&nbsp;:</p>

        <p style="text-align:center;margin:32px 0;">
          <a href="${ServerURL.frontendUrl}/verify-email?token=${data.verificationToken}" class="button">
            Vérifier mon e-mail
          </a>
        </p>

        <p>Si le bouton ne fonctionne pas, copiez-collez le lien suivant dans votre navigateur&nbsp;:</p>

        <p>
          <a href="${ServerURL.frontendUrl}/verify-email?token=${data.verificationToken}">
            ${ServerURL.frontendUrl}/verify-email?token=${data.verificationToken}
          </a>
        </p>
        
        <p>À très bientôt&nbsp;!<br>L'équipe ProsOnWork</p>`,
      }),
    });
  }

  @EventPattern(ResetPasswordRequestedEvent)
  async onResetPasswordRequest(
    @Payload('payload') data: ResetPasswordRequestedDTO,
  ) {
    const user = await this.eventHub.sendQuery<UserDTO>(new UserGetQuery(data));

    await this.emailService.sendMail({
      recepient: user.email,
      template: this.emailService.getTemplate({
        subject: 'Réinitialisation de votre mot de passe',
        html: `<p>Bonjour ${user.name ?? ''},</p>

        <p>Nous avons reçu une demande de réinitialisation de votre mot de passe. Pour choisir un nouveau mot de passe, cliquez sur le bouton ci-dessous&nbsp;:</p>

        <p style="text-align:center;margin:32px 0;">
          <a href="${ServerURL.frontendUrl}/reset-password?token=${data.resetToken}" class="button">
            Réinitialiser mon mot de passe
          </a>
        </p>

        <p>Si le bouton ne fonctionne pas, copiez-collez le lien suivant dans votre navigateur&nbsp;:</p>

        <p>
          <a href="${ServerURL.frontendUrl}/reset-password?token=${data.resetToken}">
            ${ServerURL.frontendUrl}/reset-password?token=${data.resetToken}
          </a>
        </p>
        
        <p>À très bientôt&nbsp;!<br>L'équipe ProsOnWork</p>`,
      }),
    });
  }
}
