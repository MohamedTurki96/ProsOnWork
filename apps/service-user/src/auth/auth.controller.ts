import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, EventHub, InjectableLogger } from '@pros-on-work/core';
import {
  ChangePasswordCommandDTO,
  RequestPasswordResetDTO,
  ResetPasswordDTO,
  ResetPasswordRequestedEvent,
  UserChangePasswordCommand,
  UserLoginCommand,
  UserLoginDTO,
  UserPasswordChangedEvent,
  UserRequestPasswordResetCommand,
  UserResetPasswordCommand,
  UserVerifyEmailCommand,
  VerifyEmailDTO,
} from '@pros-on-work/resources';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventHub: EventHub,
    private readonly logger: InjectableLogger,
  ) {}

  @CommandPattern(UserLoginCommand)
  async handleLogin(@Payload('payload') dto: UserLoginDTO) {
    return await this.authService.login(dto);
  }

  @CommandPattern(UserChangePasswordCommand)
  async handleChangePassword(
    @Payload('payload') dto: ChangePasswordCommandDTO,
  ) {
    const result = await this.authService.changePassword(dto.id, dto);

    await this.eventHub.emitEvent(
      new UserPasswordChangedEvent({
        id: dto.id,
      }),
    );

    return result;
  }

  @CommandPattern(UserRequestPasswordResetCommand)
  async handleRequestReset(@Payload('payload') dto: RequestPasswordResetDTO) {
    const result = await this.authService.requestReset(dto);

    await this.eventHub.emitEvent(new ResetPasswordRequestedEvent({
      email: dto.email,
      resetToken: result.token
    }))

    return result;
  }

  @CommandPattern(UserResetPasswordCommand)
  async handleReset(@Payload('payload') dto: ResetPasswordDTO) {
    return await this.authService.resetPassword(dto);
  }

  @CommandPattern(UserVerifyEmailCommand)
  async handleVerify(@Payload('payload') dto: VerifyEmailDTO) {
    return await this.authService.verifyEmail(dto);
  }
}
